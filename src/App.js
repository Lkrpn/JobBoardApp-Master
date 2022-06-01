import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

function App() {
  const [jobList, setJobList] = useState([]);

  const [filteredJobList, setFilteredJobList] = useState([]);

  useEffect(() => {
    fetch(
      "https://thingproxy.freeboard.io/fetch/https://pastebin.com/raw/wi9cNQu4"
    )
      .then((res) => res.json())
      .then((res) => {
        setJobList(() => res);
        setFilteredJobList(() => res);
      });
  }, []);

  const [filterValues, setFilterValues] = useState({
    department: "",
    location: "",
  });

  const handleReset = () => {
    setFilterValues(() => ({
      department: "",
      location: "",
    }));
    setFilteredJobList(() => jobList);
  };
  const handleFilterValueChange = (e) => {
    setFilterValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setFilteredJobList(() => {
      if (filterValues.department.length === 0) {
        return jobList.filter((job) => {
          if (filterValues.location.length === 0) return true;
          return job.locations.includes(filterValues.location);
        });
      }

      return jobList
        .filter((job) => job.department === filterValues.department)
        .filter((job) => {
          if (filterValues.location.length === 0) return true;
          return job.locations.includes(filterValues.location);
        });
    });
  }, [filterValues.department, filterValues.location]);
  return (
    <div className="App">
      <h1>Jobs</h1>
      <div className="filter">
        <div>
          <label htmlFor="department-filter">Department</label>
          <select
            id="department-filter"
            name="department"
            onChange={handleFilterValueChange}
            value={filterValues.department}
          >
            <option label="" value={""} />
            {[...new Set(jobList.map((job) => job.department))].map((dept) => (
              <option key={dept} label={dept} value={dept} />
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location-filter">Location</label>
          <select
            id="location-filter"
            name="location"
            onChange={handleFilterValueChange}
            value={filterValues.location}
          >
            <option label="" value={""} />
            {[...new Set(jobList.map((job) => job.locations).flat())].map(
              (location) => (
                <option label={location} value={location} key={location} />
              )
            )}
          </select>
        </div>
        <button className="filter-reset-button" onClick={handleReset}>
          Reset filter
        </button>
      </div>

      <div className="story-card-list">
        {filteredJobList.length === 0 && jobList.length === 0 && (
          <p>Loading jobs</p>
        )}
        {filteredJobList.length === 0 && jobList.length !== 0 && (
          <p>No Jobs found</p>
        )}
        {filteredJobList.map((job) => (
          <StoryCard
            title={job.title}
            department={job.department}
            locations={job.locations.join(" | ")}
            jobId={job.id}
            key={job.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
