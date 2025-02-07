
export default function Home() {
  return (
    <div className="container text-center">
      <header className="py-5">
        <h1 className="display-4">Biswajit Panday</h1>
        <h2 className="text-secondary">Senior .NET Developer | Cloud & Microservices</h2>
        <p className="lead mt-3">
          Passionate about building scalable, high-performance applications.
        </p>
        <a className="btn btn-primary btn-lg mt-3" href="/projects">View Projects</a>
      </header>

      <section className="mt-5">
        <h3>Skills</h3>
        <div className="row mt-4">
          <div className="col-md-4">
            <h5>Languages</h5>
            <p>C#, JavaScript, TypeScript, SQL</p>
          </div>
          <div className="col-md-4">
            <h5>Frameworks</h5>
            <p>ASP.NET Core, Blazor, React, Node.js</p>
          </div>
          <div className="col-md-4">
            <h5>Cloud & DevOps</h5>
            <p>AWS, Azure, Docker, Kubernetes</p>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h3>Contact</h3>
        <p>Email: <a href="mailto:biswajitmailid@gmail.com">biswajitmailid@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/biswajitpanday/">LinkedIn Profile</a></p>
        <p>GitHub: <a href="https://github.com/biswajitpanday">GitHub Profile</a></p>
      </section>
    </div>
  );
}
