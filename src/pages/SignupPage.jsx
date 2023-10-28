import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png"

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telefone: "",
    password: "",
  });
  const [photo, setPhoto] = useState();
  const [userType, setUserType] = useState("user");

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    //lógica de submit do form
    e.preventDefault();
    try {
      // const url = chamada para api de upload
      const url = await getUrl(photo);

      if (userType === "user") {
        await axios.post("https://vagasdaqui.cyclic.cloud/user/signup", {
         //await axios.post("http://localhost:4000/user/signup", {
          ...form,
          profilePicture: url,
        });
      }
      if (userType === "business") {
        await axios.post("https://vagasdaqui.cyclic.cloud/business/signup", {
        // await axios.post("http://localhost:4000/business/signup", {
          ...form,
          profilePicture: url,
        });
      }

      navigate("/login");
    } catch (error) {
      // lógico se der erro na requisição
      toast.error("Erro ao cadastrar, tente novamente!");
      console.log(error);
    }
  }
  async function getUrl(photo) {
    //photo = state com a foto guardada
    try {
      const multiPartForm = new FormData();

      multiPartForm.append("picture", photo);

      const response = await api.post("/upload/file", multiPartForm);

      console.log(response);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  function handlePhoto(e) {
    //  console.log(e.target.files[0]); -> onde a foto está guardada
    setPhoto(e.target.files[0]);
  }

  return (
    <div className="mt-10">
    <div className="flex min-h-full justify-center items-center ">
       <div className="sm:w-full sm:max-w-sm ">
          <img
             className="max-w-[200px] hidden sm:block mx-auto"
             src={Logo}
             alt="Vagas Daqui"
          />
          <h2 className="mt-4 text-center text-2xl font-semibold leading-9 text-blue-900">
             Criar Conta
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
             <div className="flex items-center justify-evenly space-x-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                   Usuário
                   <input
                      type="radio"
                      name="userType"
                      value="user"
                      onChange={handleRadio}
                      checked={userType === "user"}
                      className="ml-2"
                   />
                </label>

                <label className="block text-sm font-medium leading-6 text-gray-900">
                   Empresa
                   <input
                      type="radio"
                      name="userType"
                      value="business"
                      onChange={handleRadio}
                      checked={userType === "business"}
                      className="ml-2"
                   />
                </label>
             </div>

             <div>
                <label
                   htmlFor="name"
                   className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Nome Completo
                </label>
                <div className="mt-2">
                   <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                   />
                </div>
             </div>

             <div>
                <label
                   htmlFor="email"
                   className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Email
                </label>
                <div className="mt-2">
                   <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                   />
                </div>
             </div>

             <div>
                <label
                   htmlFor="telefone"
                   className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Telefone
                </label>
                <div className="mt-2">
                   <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      value={form.telefone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                   />
                </div>
             </div>

             <div>
                <label
                   htmlFor="password"
                   className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Senha
                </label>
                <div className="mt-2">
                   <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={form.password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                   />
                </div>
             </div>

             <div className="mt-2">
                <label
                   htmlFor="photo"
                   className="block text-sm font-medium leading-6 text-gray-900"
                >
                   Foto de perfil
                </label>
                <div className="flex items-center mt-1 ">
                   <label
                      htmlFor="photo"
                      className="w-full text-center cursor-pointer bg-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-600 rounded-md shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
                   >
                      <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                         className="w-5 h-5 inline-block mr-2"
                      >
                         <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                         />
                      </svg>
                      Escolher Foto
                   </label>
                   <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handlePhoto}
                      className="hidden"
                   />
                </div>
             </div>

             <div>
                <button
                   type="submit"
                   className="w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                   Cadastrar-se
                </button>
             </div>
          </form>
          <Toaster />

          <p className="mt-5 text-center text-xs text-gray-500">
             Problemas com o cadastro?{" "}
             <a
                href="https://wa.me/+5511981860227/?text=Não%20consegui%20me%20cadastrar%20no%20site"
                className="font-semibold leading-6 text-blue-900 hover:text-blue-700"
                target="_blank"
                rel="noreferrer noopener"
             >
                Entre em contato com a gente
             </a>
          </p>
       </div>
    </div>
    </div>

    
  );
}

export default SignupPage;
