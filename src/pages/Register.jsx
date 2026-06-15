import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
const navigate = useNavigate();

const [name, setName] = useState("");
const [course, setCourse] = useState("");
const [branch, setBranch] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {
e.preventDefault();


if (
  !name ||
  !course ||
  !branch ||
  !email ||
  !password
) {
  alert("Please fill all fields");
  return;
}

try {
  setLoading(true);

  await registerUser(
    name,
    email,
    password,
    course,
    branch
  );

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
        Join.
        <br />
        Learn.
        <br />
        Excel.
      </h1>

      <p className="mt-6 text-lg text-purple-100 max-w-lg">
        Create your account and gain access
        to notes, PYQs, video resources and
        study material shared by students.
      </p>

      <div className="mt-12 space-y-4">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          📚 Verified Study Resources
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          🎥 Video Tutorials & Learning Links
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          📄 Previous Year Question Papers
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          🚀 Community Driven Learning
        </div>

      </div>

    </div>

    <div className="text-purple-100 text-sm">
      © {new Date().getFullYear()} College Smart Hub
    </div>

  </div>

  {/* Right Side */}

  <div className="flex items-center justify-center p-6">

    <div className="w-full max-w-lg">

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
            Create Account
          </h2>

          <p className="text-slate-500 mt-3">
            Start your learning journey today.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="
            w-full
            bg-slate-100
            rounded-xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-purple-500
            "
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              className="
              w-full
              bg-slate-100
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
              "
            />

            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) =>
                setBranch(e.target.value)
              }
              className="
              w-full
              bg-slate-100
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-purple-500
              "
            />

          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
            w-full
            bg-slate-100
            rounded-xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-purple-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            w-full
            bg-slate-100
            rounded-xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-purple-500
            "
          />

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
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-slate-500">

            Already have an account?

            <Link
              to="/login"
              className="
              ml-2
              text-purple-600
              hover:text-purple-700
              font-semibold
              "
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>

  </div>

</div>

);
}
