export default function Projects() {
    const projects = [
      {
        name: "BugBusters",
        url: "https://github.com/biswajitpanday/BugBusters",
        description: "A full-stack issue tracking system built with ASP.NET Core and React.",
      },
      {
        name: "HyperCache",
        url: "https://github.com/biswajitpanday/HyperCache",
        description: "A high-performance .NET caching solution for SQL Server.",
      },
      {
        name: "EmailEngine",
        url: "https://github.com/biswajitpanday/EmailEngine",
        description: "A scalable email synchronization service integrating Outlook and Elasticsearch.",
      },
      {
        name: "REPR Pattern",
        url: "https://github.com/biswajitpanday/REPR-Pattern",
        description: "An API design pattern using FastEndpoints and .NET 8.",
      },
    ];
  
    return (
      <div className="container">
        <h1 className="my-4 text-center">Projects</h1>
        <div className="row">
          {projects.map((project, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                  <a href={project.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  