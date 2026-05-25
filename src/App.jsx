import { useEffect, useState } from "react";
import { Search, RefreshCw, Users, HelpCircle, Activity, Globe } from "lucide-react";
import Card from "./components/Card.jsx";
import "./App.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar skeleton-shimmer"></div>
      <div className="skeleton-name skeleton-shimmer"></div>
      <div className="skeleton-rows">
        <div className="skeleton-row">
          <div className="skeleton-row-left skeleton-shimmer"></div>
          <div className="skeleton-row-right skeleton-shimmer"></div>
        </div>
        <div className="skeleton-row">
          <div className="skeleton-row-left skeleton-shimmer"></div>
          <div className="skeleton-row-right skeleton-shimmer"></div>
        </div>
        <div className="skeleton-row">
          <div className="skeleton-row-left skeleton-shimmer"></div>
          <div className="skeleton-row-right skeleton-shimmer"></div>
        </div>
        <div className="skeleton-row">
          <div className="skeleton-row-left skeleton-shimmer"></div>
          <div className="skeleton-row-right skeleton-shimmer"></div>
        </div>
        <div className="skeleton-row">
          <div className="skeleton-row-left skeleton-shimmer"></div>
          <div className="skeleton-row-right skeleton-shimmer"></div>
        </div>
      </div>
      <div className="skeleton-button skeleton-shimmer"></div>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [natFilter, setNatFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  async function loadRandom(signal) {
    try {
      setStatus("loading");
      setError(null);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers",
        { signal }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.data && data.data.data) {
        setPosts(data.data.data);
        setStatus("success");
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Something went wrong while fetching users.");
      setStatus("error");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    
    Promise.resolve().then(() => {
      loadRandom(controller.signal);
    });

    return () => controller.abort();
  }, []);

  const handleRefresh = () => {
    loadRandom();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setGenderFilter("all");
    setNatFilter("all");
    setSortBy("default");
  };

  // Get dynamic unique nationalities list for dropdown
  const uniqueNationalities = [...new Set(posts.map((p) => p.nat))].filter(Boolean).sort();

  // Statistics calculation based on total fetched users
  const totalUsersCount = posts.length;
  const avgAge = totalUsersCount
    ? Math.round(posts.reduce((sum, p) => sum + p.dob?.age, 0) / totalUsersCount)
    : 0;
  const femaleRatio = totalUsersCount
    ? Math.round((posts.filter((p) => p.gender === "female").length / totalUsersCount) * 100)
    : 0;

  const getMostCommonNat = () => {
    if (!posts.length) return "N/A";
    const counts = {};
    posts.forEach((p) => {
      if (p.nat) counts[p.nat] = (counts[p.nat] || 0) + 1;
    });
    let maxNat = "N/A";
    let maxCount = 0;
    Object.entries(counts).forEach(([nat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxNat = nat;
      }
    });
    return maxNat;
  };
  const commonNat = getMostCommonNat();

  // Filter and sort users
  const filteredPosts = posts
    .filter((post) => {
      const first = post.name?.first || "";
      const last = post.name?.last || "";
      const fullName = `${first} ${last}`.toLowerCase();
      const city = post.location?.city || "";
      const state = post.location?.state || "";
      const country = post.location?.country || "";
      const fullLoc = `${city} ${state} ${country}`.toLowerCase();
      const email = (post.email || "").toLowerCase();

      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        fullLoc.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());

      const matchesGender =
        genderFilter === "all" || (post.gender && post.gender.toLowerCase() === genderFilter);

      const matchesNat =
        natFilter === "all" || (post.nat && post.nat.toLowerCase() === natFilter.toLowerCase());

      return matchesSearch && matchesGender && matchesNat;
    })
    .sort((a, b) => {
      if (sortBy === "age-asc") return (a.dob?.age || 0) - (b.dob?.age || 0);
      if (sortBy === "age-desc") return (b.dob?.age || 0) - (a.dob?.age || 0);
      if (sortBy === "name-asc") {
        const nameA = `${a.name?.first || ""} ${a.name?.last || ""}`.toLowerCase();
        const nameB = `${b.name?.first || ""} ${b.name?.last || ""}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === "name-desc") {
        const nameA = `${a.name?.first || ""} ${a.name?.last || ""}`.toLowerCase();
        const nameB = `${b.name?.first || ""} ${b.name?.last || ""}`.toLowerCase();
        return nameB.localeCompare(nameA);
      }
      return 0;
    });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-section">
          <h1>UserSphere</h1>
          <p>Explore, manage, and discover random user profiles with dynamic insights.</p>
        </div>
        <button
          className={`btn-refresh ${status === "loading" ? "loading" : ""}`}
          onClick={handleRefresh}
          disabled={status === "loading"}
          id="btn-refresh-users"
        >
          <RefreshCw />
          {status === "loading" ? "Refreshing..." : "Fetch New Users"}
        </button>
      </header>

      {/* Stats Dashboard */}
      <section className="stats-dashboard">
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <Users />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Pool</span>
            <span className="stat-value">{status === "loading" ? "..." : totalUsersCount}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <Activity />
          </div>
          <div className="stat-details">
            <span className="stat-label">Avg. Age</span>
            <span className="stat-value">{status === "loading" ? "..." : `${avgAge} yrs`}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <HelpCircle />
          </div>
          <div className="stat-details">
            <span className="stat-label">Gender Split</span>
            <span className="stat-value">
              {status === "loading" ? "..." : `${100 - femaleRatio}% M / ${femaleRatio}% F`}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <Globe />
          </div>
          <div className="stat-details">
            <span className="stat-label">Top Nat.</span>
            <span className="stat-value">{status === "loading" ? "..." : commonNat}</span>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="controls-panel">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, location, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="search-input"
          />
        </div>

        <div className="filter-group">
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              id="filter-gender"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select
              className="filter-select"
              value={natFilter}
              onChange={(e) => setNatFilter(e.target.value)}
              id="filter-nationality"
            >
              <option value="all">All Nationalities</option>
              {uniqueNationalities.map((nat) => (
                <option key={nat} value={nat.toLowerCase()}>
                  {nat}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sort-by"
            >
              <option value="default">Sort: Default</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
              <option value="age-asc">Age: Youngest First</option>
              <option value="age-desc">Age: Oldest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="card-grid">
        {status === "loading" ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : status === "error" ? (
          <div className="state-message-card error">
            <div className="state-message-icon-wrapper">
              <RefreshCw />
            </div>
            <h2>Failed to Load Profiles</h2>
            <p>{error}</p>
            <button className="btn-reset" onClick={handleRefresh}>
              <RefreshCw /> Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="state-message-card">
            <div className="state-message-icon-wrapper">
              <Search />
            </div>
            <h2>No Users Found</h2>
            <p>Your search filters didn't match any profiles. Try resetting the filters or fetching fresh users.</p>
            <button className="btn-reset" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => <Card {...post} key={post.login?.uuid || post.id} />)
        )}
      </main>

      <footer className="app-footer">
        <p>
          UserSphere Dashboard • Built with React & Vite • Data from{" "}
          <a href="https://api.freeapi.app" target="_blank" rel="noreferrer">
            FreeAPI
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
