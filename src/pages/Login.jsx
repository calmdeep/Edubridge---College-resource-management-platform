import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  await loginUser(email, password);

  navigate("/dashboard");
} catch (error) {
  console.error(error);
  alert(error.message);
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">


  {/* Left Side */}

  <div
    className="
    hidden
    lg:flex
    flex-col
    justify-between
    bg-gradient-to-br
    from-indigo-950
    via-purple-900
    to-violet-600
    text-white
    p-16
    "
  >

    <div>

      <div
        className="
        inline-flex
        items-center
        gap-2
        bg-white/10
        backdrop-blur-md
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        "
      >
        🎓 College Smart Hub
      </div>

      <h1 className="mt-10 text-6xl font-bold leading-tight">
        Learn.
        <br />
        Share.
        <br />
        Grow.
      </h1>

      <p className="mt-6 text-lg text-purple-100 max-w-lg">
        Access notes, PYQs, study materials,
        tutorials and academic resources
        designed for university students.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-12">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="text-2xl font-bold">
            1000+
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Resources
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="text-2xl font-bold">
            200+
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            PYQs
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="text-2xl font-bold">
            50+
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Subjects
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="text-2xl font-bold">
            500+
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Students
          </p>
        </div>

      </div>

    </div>

    <div className="text-purple-100 text-sm">
      © {new Date().getFullYear()} College Smart Hub
    </div>

  </div>

  {/* Right Side */}

  <div className="flex items-center justify-center p-6">

    <div className="w-full max-w-md">

      <div
        className="
        bg-white/90
        backdrop-blur-xl
        rounded-3xl
        shadow-2xl
        border
        border-slate-100
        p-8
        "
      >

        <div className="text-center mb-8">

          <div className="lg:hidden mb-4">
            <h1 className="text-2xl font-bold text-purple-700">
              College Smart Hub
            </h1>
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-3">
            Sign in to continue your learning journey.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="
              w-full
              bg-slate-100
              border
              border-transparent
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:border-purple-500
              transition
              "
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="
              w-full
              bg-slate-100
              border
              border-transparent
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:border-purple-500
              transition
              "
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-purple-600
            hover:bg-purple-700
            hover:scale-[1.01]
            text-white
            py-4
            rounded-xl
            font-semibold
            transition-all
            duration-200
            shadow-lg
            shadow-purple-500/20
            disabled:opacity-70
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-slate-500">

            Don't have an account?

            <Link
              to="/register"
              className="
              ml-2
              text-purple-600
              hover:text-purple-700
              font-semibold
              "
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  </div>

</div>
);
}
