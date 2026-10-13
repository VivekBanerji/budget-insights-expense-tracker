import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '8mb' }));
const port = Number(process.env.PORT || 4000);
const client = process.env.MONGODB_URI ? new MongoClient(process.env.MONGODB_URI) : null;
let transactions;
let budgets;
let loans;
let profile;
let dbStatus = 'in-memory demo';

async function connectDb() {
  if (!client) return;
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'budget_insights');
  transactions = db.collection('transactions');
  budgets = db.collection('budgets');
  loans = db.collection('loans');
  profile = db.collection('profiles');
  dbStatus = 'mongodb connected';
}
const demoTransactions = [];
const transactionStore = () => transactions || { find: () => ({ sort: () => ({ toArray: async () => demoTransactions }) }), insertOne: async doc => { demoTransactions.push({ ...doc, _id: String(Date.now()) }); return { insertedId: demoTransactions.at(-1)._id }; }, deleteOne: async ({_id}) => { const i=demoTransactions.findIndex(t=>String(t._id)===String(_id)); if(i>=0)demoTransactions.splice(i,1); return { deletedCount: i>=0?1:0 }; } };
app.get('/api/health', (_req,res) => res.json({ ok: true, database: dbStatus, aiConfigured: Boolean(process.env.OPENAI_API_KEY) }));
app.get('/api/transactions', async (_req,res,next) => { try { res.json(await transactionStore().find({}).sort({ date: -1 }).toArray()); } catch(e){next(e);} });
app.post('/api/transactions', async (req,res,next) => { try { const { title, amount, type, category, date } = req.body || {}; if(!title?.trim() || !Number.isFinite(Number(amount)) || Number(amount)<=0 || !['Spend','Credit'].includes(type) || !category || !/^\d{4}-\d{2}-\d{2}$/.test(date||'')) return res.status(400).json({error:'Valid title, positive amount, type, category and YYYY-MM-DD date are required.'}); const doc={ title:title.trim(), amount:Number(amount), type, category, date, createdAt:new Date() }; const result=await transactionStore().insertOne(doc); res.status(201).json({ ...doc, _id: result.insertedId }); } catch(e){next(e);} });
app.delete('/api/transactions/:id', async (req,res,next) => { try { const result=await transactionStore().deleteOne({ _id: req.params.id }); res.json({deleted:result.deletedCount===1}); } catch(e){next(e);} });
app.post('/api/ai/receipt', async (req,res) => { if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'AI is not configured. Add OPENAI_API_KEY to server/.env. Do not expose it in the frontend.'}); const { imageDataUrl }=req.body||{}; if(typeof imageDataUrl!=='string'||!/^data:image\/(png|jpeg|webp);base64,/.test(imageDataUrl)) return res.status(400).json({error:'Provide an image as a PNG, JPEG or WebP data URL.'}); try { const ai=new OpenAI({apiKey:process.env.OPENAI_API_KEY}); const response=await ai.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-4o-mini',response_format:{type:'json_object'},messages:[{role:'system',content:'Extract fields from a receipt image. Return JSON only with merchant (string), date (YYYY-MM-DD or empty string), amount (number or null), category (one of Food, Transport, Bills, Shopping, Salary, Medical, Other), currency (string), confidence (low, medium, high). Do not infer unreadable values; use null/empty.'},{role:'user',content:[{type:'text',text:'Extract the receipt details for user review. Never claim a transaction was paid unless the receipt supports that.'},{type:'image_url',image_url:{url:imageDataUrl}}]}]}); const parsed=JSON.parse(response.choices[0].message.content||'{}'); res.json({ ...parsed, requiresUserConfirmation:true }); } catch(error){ console.error('Receipt AI error:',error.message); res.status(502).json({error:'Receipt extraction failed. Please enter the details manually.'}); } });
app.post('/api/ai/coach', async (req,res) => { if(!process.env.OPENAI_API_KEY) return res.status(503).json({error:'AI is not configured. Add OPENAI_API_KEY to server/.env.'}); const { question, summary }=req.body||{}; if(typeof question!=='string'||!question.trim()) return res.status(400).json({error:'A question is required.'}); try { const ai=new OpenAI({apiKey:process.env.OPENAI_API_KEY}); const response=await ai.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-4o-mini',messages:[{role:'system',content:'You are a careful personal budgeting assistant. Give educational budgeting guidance, explain assumptions, do not invent missing financial facts, and do not give personalized securities/tax/legal advice. Remind users to verify records and upcoming bills.'},{role:'user',content:JSON.stringify({question,financialSummary:summary||{}})}],max_tokens:500}); res.json({answer:response.choices[0].message.content||'No suggestion available.'}); } catch(error){ console.error('Coach AI error:',error.message); res.status(502).json({error:'Could not generate advice right now.'}); } });
app.use((err,_req,res,_next)=>{ console.error(err); res.status(500).json({error:'Unexpected server error.'}); });
connectDb().then(()=>app.listen(port,()=>console.log(`Budget Insights API listening on http://localhost:${port} (${dbStatus})`))).catch(error=>{console.error('Database connection failed:',error.message);process.exit(1);});
