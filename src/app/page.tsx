import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Biswajit Panday</h1>
      <h2>Senior .NET Developer | Cloud & Microservices</h2>
      <p>Welcome to my portfolio! I'm passionate about scalable, high-performance applications.</p>

      <h3>Projects</h3>
      <ul>
        <li><Link href="https://github.com/biswajitpanday/hypercache">HyperCache (Blazor & .NET 9)</Link></li>
        <li><Link href="https://github.com/biswajitpanday/BugBusters">BugBusters (Issue Tracking)</Link></li>
        <li><Link href="https://github.com/biswajitpanday/EmailEngine">EmailEngine (Email Sync)</Link></li>
        <li><Link href="https://github.com/biswajitpanday/REPR-Pattern">REPR Pattern (API Design)</Link></li>
      </ul>

      <h3>Contact</h3>
      <p>Email: <a href="mailto:biswajitmailid@gmail.com">biswajitmailid@gmail.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/biswajitpanday/">LinkedIn</a></p>
      <p>GitHub: <a href="https://github.com/biswajitpanday">GitHub</a></p>
    </div>
  );
}
