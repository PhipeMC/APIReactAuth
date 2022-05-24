import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Navbar, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/NavMenu.css';
import '../css/style.css';
import image from '../Images/northwindLogoUnico.png';
import Worktable from '../Images/Mesa de trabajo2.png';
import Design from '../Images/Design stats-amico.svg';
import Slpash from '../Images/pickawood-6tAIO3pxde4-unsplash.jpg';
import Splash2 from '../Images/remy-gieling-qqtE2yX7POI-unsplash.jpg'

export class IndexHome extends Component {

    

    render() {
        return (
            <div>
                <div className="startView">
                    <header>
                        <Navbar dark expand="md" full="true" className='bg-faded d-flex justify-content-center px-3'>
                            <Container fluid>
                                <a href='/' className='navbar-brand d-flex align-items-center w-50 me-auto fw-bold'>
                                    <img src={image} width='25rem' height='25em' className='me-1' /> Northwind</a>
                                <div className='navbar-collapse collapse w-100' id='collapsingNavbar3'>
                                    <ul className='navbar-nav w-100 justify-content-center'>
                                        <NavItem>
                                            <NavLink tag={Link} className="" to="#caracteristicas2">Caracteristicas</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="" to="#pricing">Planes</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="" to="#soporte">FAQs</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="" to="/suppliers">Empresa</NavLink>
                                        </NavItem>
                                    </ul>
                                    <ul className='nav navbar-nav ms-auto w-100 justify-content-end'>
                                        <Button color='primary' className='me-md-2 mb-1 mb-lg-0' outline>Registrate</Button>
                                        <Button color='' className='btn-primary'>Inicia sesión</Button>
                                    </ul>
                                </div>
                            </Container>
                        </Navbar>

                    </header>
                    <div id="inicio">
                        <div className="container col-xxl-8 overflow-hidden">
                            <div className="row flex-sm-row align-items-center g-5 py-5">
                                <div className="col-12 col-lg-6">
                                    <h1 className="display-4 fw-bold lh-1 mb-3">Balancea estabilidad con agilidad</h1>
                                    <p className="lead">Te brindamos control total, realizando un seguimiento preciso a tus
                                        existencias
                                    </p>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        <button type="button" className="btn btn-warning btn-lg px-4 me-md-2">Prueba gratis</button>
                                        <a className="btn btn-light btn-lg px-4" href="#caracteristicas2">Descubre
                                            más</a>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6" data-aos="zoom-in-left">
                                    <img src={Design} className="d-block mx-sm-auto img-fluid" height="800"
                                        loading="lazy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="caracteristicas">
                    <div className="container px-4 pt-5" id="hanging-icons">
                        <h2 className="display-5 pb-1" color='#011931'>Soluciones a su medida</h2>
                        <div className="row g-4 pt-5 row-cols-1 row-cols-lg-3 text-dark">
                            <div className=" col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-rotate" color='#0055FF'></i></h2>
                                </div>
                                <div>
                                    <h2>Sincronice el inventario en cualquier lugar</h2>
                                    <p>Sincronización de inventario totalmente automatizada, a medida que sus niveles de
                                        inventario cambian, Northwind lo equilibra entre sus canales, ubicaciones de almacén y
                                        almacenes.</p>
                                </div>
                            </div>
                            <div className="col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-boxes-stacked" color='#0055FF'></i></h2>
                                </div>
                                <div>
                                    <h2>No te quedes sin stock</h2>
                                    <p>Tenga un mejor control y visibilidad de sus niveles de stock en todos sus canales, en un
                                        solo lugar.</p>
                                </div>
                            </div>
                            <div className="col d-flex align-items-start">
                                <div className="icon-square text-dark flex-shrink-0 me-3">
                                    <h2><i className="fa-solid fa-arrow-trend-up" color='#0055FF'></i></h2>
                                </div>
                                <div>
                                    <h2>Mire en vías del futuro</h2>
                                    <p>Prevea los periodos anteriores de mayores ventas y los productos/variantes más vendidos.
                                        Tenga en cuenta el plazo de entrega de los proveedores para no volver a agotar o exceder
                                        el stock.</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center" data-aos="fade-up">
                            <img src={Worktable} className="d-block mx-sm-auto img-fluid" alt="" width="90%" />
                        </div>
                    </div>

                    <div id="caracteristicas2" className="overflow-hidden">
                        <div className="d-flex flex-equal flex-column flex-md-row w-100 ">
                            <div className="text-center text-dark pt-3 pt-md-5 px-3 px-md-5 overflow-hidden" data-aos="fade-down-right"
                                id='back-gradient'>
                                <div className="my-3 p-3">
                                    <h2 className="display-5 fw-bold">Unifique todo su inventario</h2>
                                    <p className="lead">Sincroniza tus pedidos de todos tus canales de venta, incluyendo Shopify,
                                        Amazon,
                                        eBay y más de 21 integraciones.</p>
                                </div>
                                <div className=" mx-3 pb-5">
                                    <img src={Slpash} className="d-block mx-sm-auto img-fluid" alt=""
                                        width="100%" id='img_unsplash' />
                                </div>
                            </div>
                            <div className="text-center text-white pt-3 pt-md-5 px-3 px-md-5 overflow-hidden backgroud-gradient"
                                data-aos="fade-down-left">
                                <div className="my-3 py-3">
                                    <h2 className="display-5 fw-bold">Cumpla con todos los pedidos</h2>
                                    <p className="lead">Acelere sus pedidos con escáneres digitales de picking optimizados, cuadros de
                                        mando
                                        y automatizaciones inteligentes.</p>
                                </div>
                                <div className=" mx-3 pb-5">
                                    <img src={Splash2} className="d-block mx-sm-auto img-fluid img_unsplash"
                                        alt="" width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}