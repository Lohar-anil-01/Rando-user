import { useState } from "react";
import { Mail, Phone, Calendar, Shield, MapPin, Copy, Check, ChevronDown } from "lucide-react";

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return "";
  }
}

function Card(props) {
  const [showCreds, setShowCreds] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    });
  };

  const flag = getFlagEmoji(props.nat);

  return (
    <div className="user-card animate-fade-in">
      {/* Banner / Header */}
      <div className="card-header">
        <div className="user-avatar-container">
          <img
            src={props.picture?.large}
            alt={`${props.name?.first} ${props.name?.last}`}
            className="user-avatar"
            loading="lazy"
          />
          {props.gender && (
            <div className={`user-gender-badge ${props.gender.toLowerCase()}`}>
              {props.gender.toLowerCase() === "female" ? "♀" : "♂"}
            </div>
          )}
        </div>

        <div className="user-badge">
          {props.nat && (
            <span className="nat-tag" title={`Nationality: ${props.nat}`}>
              <span>{flag}</span>
              <span>{props.nat}</span>
            </span>
          )}
        </div>

        <h2 className="user-name">
          {props.name?.title && `${props.name.title}. `}
          {props.name?.first} {props.name?.last}
        </h2>
      </div>

      {/* Info Rows */}
      <div className="card-body">
        <div className="user-info">
          {/* Email */}
          {props.email && (
            <div className="info-row">
              <span className="info-label">
                <Mail /> Email
              </span>
              <span
                className="info-value info-value-interactive"
                onClick={() => copyToClipboard(props.email, "email")}
                title="Click to copy email"
              >
                {props.email}
                {copiedField === "email" ? (
                  <span className="copy-indicator">
                    <Check style={{ width: 10, height: 10, display: "inline-block", marginRight: 2 }} />
                    Copied
                  </span>
                ) : (
                  <Copy style={{ marginLeft: 6, opacity: 0.5 }} />
                )}
              </span>
            </div>
          )}

          {/* Location */}
          {props.location && (
            <div className="info-row">
              <span className="info-label">
                <MapPin /> Location
              </span>
              <span 
                className="info-value" 
                title={
                  props.location.coordinates 
                    ? `Coordinates: Lat ${props.location.coordinates.latitude}, Lng ${props.location.coordinates.longitude}`
                    : ""
                }
              >
                {props.location.city}, {props.location.country}
              </span>
            </div>
          )}

          {/* Phone */}
          {props.phone && (
            <div className="info-row">
              <span className="info-label">
                <Phone /> Phone
              </span>
              <span
                className="info-value info-value-interactive"
                onClick={() => copyToClipboard(props.phone, "phone")}
                title="Click to copy phone number"
              >
                {props.phone}
                {copiedField === "phone" ? (
                  <span className="copy-indicator">
                    <Check style={{ width: 10, height: 10, display: "inline-block", marginRight: 2 }} />
                    Copied
                  </span>
                ) : (
                  <Copy style={{ marginLeft: 6, opacity: 0.5 }} />
                )}
              </span>
            </div>
          )}

          {/* Birthday */}
          {props.dob && (
            <div className="info-row">
              <span className="info-label">
                <Calendar /> Birthday
              </span>
              <span className="info-value">
                {new Date(props.dob.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                ({props.dob.age} yrs)
              </span>
            </div>
          )}

          {/* Registration Date */}
          {props.registered && (
            <div className="info-row">
              <span className="info-label">
                <Calendar /> Registered
              </span>
              <span className="info-value">
                {new Date(props.registered.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Expandable Login Info */}
        {props.login && (
          <div className="login-info">
            <button
              className={`btn-toggle-credentials ${showCreds ? "active" : ""}`}
              onClick={() => setShowCreds(!showCreds)}
            >
              <Shield />
              <span>{showCreds ? "Hide Credentials" : "Show Credentials"}</span>
              <ChevronDown className="chevron" />
            </button>

            <div className={`login-details-container ${showCreds ? "open" : ""}`}>
              <div className="login-details">
                {props.login.username && (
                  <div className="credential-item">
                    <span className="credential-label">Username</span>
                    <div className="credential-value-wrapper">
                      <span className="credential-value">{props.login.username}</span>
                      <button
                        className="btn-copy-credential"
                        onClick={() => copyToClipboard(props.login.username, "username")}
                        title="Copy username"
                      >
                        {copiedField === "username" ? (
                          <Check style={{ width: 12, height: 12, color: "var(--success)" }} />
                        ) : (
                          <Copy style={{ width: 12, height: 12 }} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
                {props.login.password && (
                  <div className="credential-item">
                    <span className="credential-label">Password</span>
                    <div className="credential-value-wrapper">
                      <span className="credential-value">{props.login.password}</span>
                      <button
                        className="btn-copy-credential"
                        onClick={() => copyToClipboard(props.login.password, "password")}
                        title="Copy password"
                      >
                        {copiedField === "password" ? (
                          <Check style={{ width: 12, height: 12, color: "var(--success)" }} />
                        ) : (
                          <Copy style={{ width: 12, height: 12 }} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
