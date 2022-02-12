/* import { Link, Outlet, useSearchParams } from 'react-router-dom'; */
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { getAllUsers } from '../users';

const Users = () => {

  const [searchParams, setSerachParams] = useSearchParams();  
  const location = useLocation();
  console.log(location);
  const users = getAllUsers()
  const filter = searchParams.get("filtro") ?? ""; // filter valdra lo que tenga serachParams, si es null o indefinido, vale ""

  const handleFilter = (e) => {
    setSerachParams({ filtro: e.target.value })
  }

  /* console.log(users); */
  return (
    <div>
      <h1>Users</h1>
      {/* de value le pasamos lo que devuelva el setSearchParams (evento onchange)  */}
      <input value={filter} onChange={handleFilter} type="text" placeholder='filter' />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr"}}>
        <ul>
          {/* Aplicar filtro */}
          {users.filter( (user) => { // por cada usuario
            // si no hay ningun filtro configurado en la ruta (L8) return true para que no se haga ningun filtrado del arreglo de usuarios
            // es decir, se mapeara (.map(user => ....) toda la lista de usuarios (brinca hasta el .map)
            if(!filter) return true;  
            // si el filtro es verdadero, es decir, el usuario escribio en el cuadro de texto, entonces
            // incluiremos en el filtro el usuario que corresponda (include) a ese filtro y lo mapeamos (en .map( user => ...))
            const name = user.name.toLowerCase(); // si hay datos en el filtro, a name le asignamos ese filtro
            return name.includes(filter.toLowerCase()); // y regresamos ese filtro en lowercase, para que no sea case sensitive
          })
          .map( user => 
            <li key={user.id}>
              {/* <h2><Link to={"/users/" + user.id}>{user.name}</Link></h2> */}
              {/* En la L2 esta su import <h2><Link to={user.id.toString()}>{user.name}</Link></h2> */}
              {/* Resaltar enlace activo/seleccionado se usa NavLink 8importarlo de react router) */}
              <h2><NavLink style={({isActive}) => isActive ? {color: "red"} : {}} to={user.id.toString() + location.search}>{user.name}</NavLink></h2> 
              {/* tambien podemos definir una clase y asignarla al enlace activo
                  className={({isActive}) => isActive ? "activo": ""}   donde 'activo' seria el nombre de la clase definida en css
               */}
            </li>
          )}
        </ul>  
        <article>
          {/* Aqui "enchufaremos" (outlet) el resultado del filtro, es decir, aqui mostramos al usuario al hacer click en uno de ellos */}
          <Outlet /> 
        </article>
      </div>          
    </div>
  );
};

export default Users;

/* Muestra toda la lista de usuarios
{users.map( user => 
  <li key={user.id}>
    <h2><Link to={user.id.toString()}>{user.name}</Link></h2>
  </li>
)} 
*/
