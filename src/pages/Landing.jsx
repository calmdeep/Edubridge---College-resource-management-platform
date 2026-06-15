import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBook,
  FaFileAlt,
  FaVideo,
  FaCheckCircle,
  FaUsers,
  FaDatabase,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

import { getPlatformStats } from "../services/statsService";

export default function Landing() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalSubjects: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getPlatformStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const features = [
    {
      title: "Notes Sharing",
      description:
        "Access and share quality notes across departments.",
      icon: <FaBook />,
    },
    {
      title: "Previous Year Papers",
      description:
        "Find PYQs organized by course, branch and semester.",
      icon: <FaFileAlt />,
    },
    {
      title: "Video Resources",
      description:
        "Curated educational videos from trusted sources.",
      icon: <FaVideo />,
    },
    {
      title: "Admin Verified",
      description:
        "Every resource is reviewed before publication.",
      icon: <FaCheckCircle />,
    },
  ];

  const steps = [
    "Create Account",
    "Upload Resource",
    "Admin Review",
    "Students Learn",
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
              🎓
            </div>

            <div>

              <h1 className="font-bold text-xl">
                College Smart Hub
              </h1>

              <p className="text-xs text-slate-500">
                Student Resource Platform
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="text-slate-700 hover:text-purple-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
            >
              Get Started
            </Link>

          </div>

        </div>

      </nav>

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                🎓 Smart Learning Platform
              </span>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mt-8">

                Learn Smarter.
                <br />

                Share Better.

                <span className="text-purple-600">
                  Together.
                </span>

              </h1>

              <p className="text-slate-500 text-lg mt-8 max-w-xl">

                Access notes, PYQs, educational videos and verified academic resources from students across your university.

              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition"
                >
                  Get Started
                  <FaArrowRight />
                </Link>

                <Link
                  to="/login"
                  className="bg-white border border-slate-200 px-8 py-4 rounded-xl font-medium hover:bg-slate-50"
                >
                  Login
                </Link>

              </div>

            </div>

            <div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-8">

                <div className="space-y-4">

                  <div className="bg-slate-50 rounded-xl p-4">
                    📄 DBMS Notes
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    🎥 Operating Systems Playlist
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    📝 Computer Networks PYQ
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 text-purple-700">
                    ✅ Admin Verified Resource
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition p-8 text-center">

            <FaDatabase className="mx-auto text-4xl text-purple-600 mb-4" />

            <h2 className="text-4xl font-bold">
              {stats.totalResources}
            </h2>

            <p className="text-slate-500 mt-2">
              Approved Resources
            </p>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition p-8 text-center">

            <FaUsers className="mx-auto text-4xl text-purple-600 mb-4" />

            <h2 className="text-4xl font-bold">
              {stats.totalUsers}
            </h2>

            <p className="text-slate-500 mt-2">
              Registered Students
            </p>

          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition p-8 text-center">

            <FaGraduationCap className="mx-auto text-4xl text-purple-600 mb-4" />

            <h2 className="text-4xl font-bold">
              {stats.totalSubjects}
            </h2>

            <p className="text-slate-500 mt-2">
              Subjects Covered
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Platform Features
          </h2>

          <p className="text-slate-500 text-center mt-3">
            Everything students need in one place.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all p-6"
              >

                <div className="text-4xl text-purple-600 mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-slate-500 mt-3">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* How It Works */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {steps.map((step, index) => (

              <div
                key={step}
                className="bg-slate-50 rounded-3xl border border-slate-100 p-8 text-center"
              >

                <div className="text-5xl font-bold text-purple-600">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-lg mt-4">
                  {step}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 px-6">

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[32px] text-white p-16 text-center">

          <h2 className="text-5xl font-bold">
            Ready to Start Learning?
          </h2>

          <p className="mt-4 opacity-90 text-lg">
            Join students sharing quality academic resources.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold"
          >
            Create Free Account
          </Link>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-white border-t">

        <div className="max-w-7xl mx-auto px-6 py-10 text-center">

          <h3 className="text-2xl font-bold text-purple-500">
            EduBridge<p className="text-[16px] text-slate-500">A college resource management project</p>
          </h3>

          <p className="text-slate-500 mt-3">
            Developed By <b>Deepanshu</b>
          </p>

        </div>

      </footer>

    </div>
  );
}