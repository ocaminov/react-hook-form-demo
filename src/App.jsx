import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert('enviando datos...')
    reset()
    //antes de enviar
    //fetch
  });

  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "Nombre debe tener maximo 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      {/* correo */}
      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Correo no valido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}

      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* confirmarPassword */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar Password es requerido",
          },
          validate: (value) =>
            value === watch("password") || "Los passwords no coinciden",
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      {/* fechaNacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            return edad >= 18 || "Debe ser mayor de edad";
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

      {/* pais */}
      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {watch("pais") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}

      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" onChange={(e) => {
        console.log(e.target.files[0])
        setValue('fotoDelUsuario', e.target.files[0].name)
      }} />

      {/* terminos */}
      <label htmlFor="terminos">Acepto terminos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: 'Debe aceptar terminos y condiciones'
          }
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default App;
