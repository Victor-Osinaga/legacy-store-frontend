import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo-jarry.png';
import './nav.css';
import { FaSistrix } from 'react-icons/fa';
import { BsPerson, BsBag, BsPersonX } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useStoreContext from '../../provider/storeProvider';
import { getCategorias, getCategoriasBySubdomain } from '../../fetch/fetch';

function NavBar() {
  const { token, logout, cantInCart } = useStoreContext();
  const [navVisible, setNavVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  const [categorias, setCategorias] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (id) => {
    if (navVisible) {
      document.getElementById(id).style.zIndex = "-100"
      setIsHovered(false);
    }
    document.getElementById(id).style.zIndex = "100"
    setIsHovered(true);
  };
  const handleMouseLeave = (id) => {
    if (navVisible) {
      document.getElementById(id).style.zIndex = "100"
      setIsHovered(true);
      return
    }
    document.getElementById(id).style.zIndex = "-100"
    setIsHovered(false);
  };

  const ocultar = (id) => {
    if (navVisible) return
    document.getElementById(id).style.zIndex = "-100"
    setIsHovered(false);
  };

  useEffect(() => {
    fetchCategorias()
  }, [])

  const fetchCategorias = async (id) => {
    getCategoriasBySubdomain()
      .then((res) => {
        console.log(res);
        setCategorias(res)
      })
      .finally(() => setLoading(false))
  }

  const toggleNav = () => {
    setNavVisible(!navVisible);

    // Cambiar el overflow del body directamente
    document.body.style.overflow = navVisible ? 'auto' : 'hidden';
  };


  return (
    <nav id="nav">
      {/* <Categorias /> */}
      <div className='nav__avisosContainer'>
        <div className='nav__aviso'>ULTIMAS TENDENCIAS</div>
        <div className='nav__aviso'>ENVIOS A TODO EL PAIS</div>
      </div>

      <div className='nav__mainContainer'>
        <ul className='nav__mainAyudasContainer'>
          <li><Link to={'/cliente/preguntas/frecuentes'}>ayuda</Link></li>
          <li><Link to={'/cliente/preguntas/frecuentes'}>cambios y devoluciones</Link></li>
          <li><Link to={'/orden/estado'}>seguimiento de pedidos</Link></li>
          <li><Link to='/nosotros'>nosotros</Link></li>
        </ul>

        <div className='nav__mainLinksContainer'>
          <div id='nav__MenuSvgContainer' className='nav__MenuSvgContainer'
            onClick={toggleNav}>
            <div className='nav__burguerIconOpenContainer' id='nav__burguerIconOpenContainer'>
              <AiOutlineMenu id='nav__MenuSvg' className='nav__MenuSvg' />
            </div>
          </div>

          <Link className='nav__LogoSvgContainer' to={'/'}>
            <img id='nav__LogoSvg' src={logo} alt='logo jarry indumentaria' />
          </Link>

          {loading ? (
            <div className="spinner-grow text-secondary m-auto d-md-block d-none" role="status">
              <span className="visually-hidden m-auto">Loading...</span>
            </div>
          ) : (
            <ul className={navVisible ? "nav__mainCategoriasContainer expanded" : "nav__mainCategoriasContainer"}>
              <div id='nav__MenuSvgContainerClose' className='nav__MenuSvgContainerClose'
                onClick={toggleNav}>
                <div className='nav__burguerIconCloseContainer'>
                  <AiOutlineClose id='nav__MenuSvg' className='nav__MenuSvg' />
                </div>
              </div>
              <li className='nav_mainCategory'>
                {navVisible ? (
                  <Link to='/' onClick={toggleNav}>INICIO</Link>
                ) : (
                  <Link to='/'>INICIO</Link>
                )}
              </li>
              {token ? (navVisible ? (
                <li className='nav_mainCategory'>
                  <Link to='/admin/panel' onClick={toggleNav}>PANEL</Link>
                </li>
              ) : (
                <li className='nav_mainCategory'>
                  <Link to='/admin/panel'>PANEL</Link>
                </li>
              )
              ) : null}
              {categorias?.length > 0 ? (
                categorias.map((cat, index) => (
                  <li onMouseEnter={() => handleMouseEnter(cat.id)}
                    onMouseLeave={() => handleMouseLeave(cat.id)}
                    id={index}
                    key={cat.id}
                    className='nav_mainCategory'>
                    {navVisible ? (
                      <Link onClick={toggleNav} to={`/category/${cat.name.toLowerCase()}/${cat.id}`}>{cat.name.toUpperCase()}</Link>
                    ) : (
                      <Link onClick={() => { ocultar(cat.id) }} to={`/category/${cat.name.toLowerCase()}/${cat.id}`}>{cat.name.toUpperCase()}</Link>
                    )}

                    <ul id={cat.id} className='nav_mainSub' onMouseEnter={() => handleMouseEnter(cat.id)}
                      onMouseLeave={() => handleMouseLeave(cat.id)}>
                      {cat.subCategories.map((sub) => (
                        <li id={sub.id} key={sub.id}>
                          {navVisible ? (
                            <Link onClick={toggleNav} to={`/category/${cat.name.toLowerCase()}/${sub.name.toLowerCase()}/${sub.id}`}>{sub.name.toUpperCase()}</Link>
                          ) : (
                            <Link onClick={() => ocultar(cat.id)} to={`/category/${cat.name.toLowerCase()}/${sub.name.toLowerCase()}/${sub.id}`}>{sub.name.toUpperCase()}</Link>
                          )}

                          <div className='nav_categFromSubcategory'>
                            {sub.categories.map((uniq) => (
                              <div key={uniq.id}>
                                {navVisible ? (
                                  <Link onClick={toggleNav} to={`/category/${cat.name.toLowerCase()}/${sub.name.toLowerCase()}/${uniq.name.toLowerCase().replace(" ", "")}/${uniq.id}`} key={uniq.id}>{uniq.name}</Link>
                                ) : (
                                  <Link onClick={() => ocultar(cat.id)} to={`/category/${cat.name.toLowerCase()}/${sub.name.toLowerCase()}/${uniq.name.toLowerCase().replace(" ", "")}/${uniq.id}`} key={uniq.id}>{uniq.name}</Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : null}
            </ul>
          )}


          <div className='nav_auxiliaryContainer'>
            <form className="nav__mainFormContainer">
              <FaSistrix className='nav__mainFormIcon' />
              <input type="search" id="nav__input" placeholder="Buscar..." autoComplete="off" />
            </form>

            {token
              ?
              <Link onClick={logout} to='/' className='nav__iconLogoutContainer'>
                <BsPersonX className='nav__iconLogout' style={{ color: "red" }}></BsPersonX>
              </Link>
              :
              <Link to='/login' className='nav__iconLoginContainer'>
                <BsPerson className='nav__iconLogin'></BsPerson>
              </Link>
            }

            <Link to="/cart" className='nav__cartIconContainer'>
              <BsBag className='nav_iconCart'></BsBag>
              <span>{cantInCart()}</span>
            </Link>


          </div>


        </div>
      </div>

    </nav>
  )
}

export default NavBar;