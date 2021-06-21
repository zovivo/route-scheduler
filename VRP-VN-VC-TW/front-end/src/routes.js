import React from 'react';
import CustomMap from './views/pages/routes/CustomMap'
import DetailCustomer from './views/pages/customers/DetailCustomer'
import Customers from './views/pages/customers/Customers'
import Depots from './views/pages/depots/Depots'
import DetailDepot from './views/pages/depots/DetailDepot'
import DetailVehicle from './views/pages/vehicles/DetailVehicle'
import Vehicles from './views/pages/vehicles/Vehicles'
import Products from './views/pages/products/Products'
import Orders from './views/pages/orders/Orders'
import DetailOrder from './views/pages/orders/DetailOrder'
import Routes from './views/pages/routes/Routes'
import RouteInitialization from './views/pages/routes/init-route/RouteInitialization'
import SolutionRoutings from './views/pages/routes/solution-routing/SolutionRoutings'
import TrackingRoute from './views/pages/routes/tracking-route/TrackingRoute';
import Login from './views/pages/login/Login';
import GoodsGroups from './views/pages/goodsGroup/GoodsGroups'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/route/map', exact: true, name: 'Map', component: CustomMap },
  { path: '/customers', exact: true, name: 'Customers', component: Customers },
  { path: '/depots', exact: true, name: 'Depots', component: Depots },
  { path: '/vehicles', exact: true, name: 'Vehicles', component: Vehicles },
  { path: '/products', exact: true, name: 'Products', component: Products },
  { path: '/orders', exact: true, name: 'Orders', component: Orders },
  { path: '/orders/detail', exact: true, name: 'Order Detail', component: DetailOrder },
  { path: '/routes', exact: true, name: 'Routes', component: Routes },
  { path: '/routes-init', exact: true, name: 'Route Initialization', component: RouteInitialization },
  { path: '/vehicles/detail', exact: true, name: 'Vehicle Detail', component: DetailVehicle },
  { path: '/customers/detail', exact: true, name: 'Customer Detail', component: DetailCustomer },
  { path: '/depots/detail', exact: true, name: 'Depot Detail', component: DetailDepot },
  { path: '/routes/solutions', exact: true, name: 'SolutionRoutings', component: SolutionRoutings },
  { path: '/routes/solutions/tracking', exact: true, name: 'TrackingRoute', component: TrackingRoute },
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/goods-group', exact: true, name: 'Good Groups', component: GoodsGroups },
];

export default routes;
