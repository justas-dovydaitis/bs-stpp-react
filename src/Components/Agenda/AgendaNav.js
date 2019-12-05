import React from 'react';
import AgendaNavItem from './AgendaNavitem';


const AgendaNav = (props) => {
    const makeNav = () => {
        return props.navItems.map((item, key = 0) => {
            return <AgendaNavItem
                active={(item._id === props.active)}
                onClick={() => props.changeActive(item._id)}
                name={item.name}
                key={key++}
            />
        })
    };
    return (
        <div className='nav'>
            {makeNav()}
        </div>
    )
}

export default AgendaNav;