import { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaSave, FaShieldAlt } from "react-icons/fa";

const defaultProfile = { name: "Vivek", email: "vivek@example.com", location: "Kerala, India", occupation: "Personal account" };

function readProfile() {
  try { return { ...defaultProfile, ...JSON.parse(localStorage.getItem("budget-insights-profile") || "{}") }; }
  catch { return defaultProfile; }
}

function Profile() {
  const [profile, setProfile] = useState(readProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => { localStorage.setItem("budget-insights-profile", JSON.stringify(profile)); }, [profile]);

  const update = (event) => { setSaved(false); setProfile((current) => ({ ...current, [event.target.name]: event.target.value })); };
  const save = (event) => { event.preventDefault(); localStorage.setItem("budget-insights-profile", JSON.stringify(profile)); setSaved(true); };

  return (
    <div className="profile-page page-enter">
      <div className="page-heading-row"><div><span className="eyebrow">YOUR SPACE</span><h1>My profile</h1><p>Manage your personal information and account details.</p></div></div>
      <section className="profile-hero"><div className="profile-avatar-large"><FaUserCircle /></div><div className="profile-hero-copy"><span className="profile-status"><span /> Active profile</span><h2>{profile.name || "Your name"}</h2><p>{profile.occupation || "Personal account"}</p></div><div className="profile-hero-stat"><span>Member since</span><strong><FaCalendarAlt /> October 2026</strong></div></section>
      <div className="profile-layout"><section className="content-card profile-form-card"><div className="section-heading"><div><h2>Personal information</h2><p>Keep your profile details up to date.</p></div></div>
        <form onSubmit={save} className="profile-form"><label htmlFor="profile-name">Full name</label><div className="field-with-icon"><FaUserCircle /><input id="profile-name" name="name" value={profile.name} onChange={update} required maxLength="80" /></div>
          <label htmlFor="profile-email">Email address</label><div className="field-with-icon"><FaEnvelope /><input id="profile-email" name="email" type="email" value={profile.email} onChange={update} required /></div>
          <label htmlFor="profile-location">Location</label><div className="field-with-icon"><FaMapMarkerAlt /><input id="profile-location" name="location" value={profile.location} onChange={update} /></div>
          <label htmlFor="profile-occupation">Account label</label><input id="profile-occupation" name="occupation" value={profile.occupation} onChange={update} />
          <div className="profile-form-footer"><span className="save-feedback">{saved ? "Profile saved on this device." : "Your changes are saved locally when you click Save."}</span><button className="primary-button" type="submit"><FaSave /> Save profile</button></div>
        </form>
      </section>
      <aside className="profile-side-column"><section className="content-card security-card"><span className="security-icon"><FaShieldAlt /></span><h3>Your privacy matters</h3><p>This demo stores profile details in this browser only. It does not send your information to a server.</p></section><section className="content-card account-details"><h3>Account overview</h3><div><span>Account type</span><strong>Personal</strong></div><div><span>Default currency</span><strong>Indian Rupee (₹)</strong></div><div><span>Data storage</span><strong>Local device</strong></div></section></aside></div>
    </div>
  );
}

export default Profile;
