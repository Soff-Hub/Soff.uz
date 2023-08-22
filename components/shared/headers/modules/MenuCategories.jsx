
import React, { useEffect, useState } from 'react';
import menuData from '~/public/static/data/menu.json';
import Menu from '~/components/elements/menu/Menu';
// import CollectionRepository from '~/repositories/CollectionRepository';



const MenuCategories = () => {
   
    return (
    <Menu source={menuData.product_categories} className="menu--dropdown" />

    )
 
}

export default MenuCategories;
