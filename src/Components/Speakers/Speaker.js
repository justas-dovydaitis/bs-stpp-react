import React from 'react';

import Image from '../Image';

import './style.css';

const Speaker = (props) => {
    return (
        <div className='container py-3'>
            <Image className='float-left pr-2' src='https://via.placeholder.com/200x200' alt='placeholder' />
            <h3 className='font-weight-bold text-uppercase'>Ted Neward</h3>
            <div className='font-weight-bolder my-3'>TECHNOLOGIST, LEADER & PHILOSOFER, Neward and Associates</div>
            <div>
                <p>
                    Uniquely maintain sustainable networks without flexible schemas. Authoritatively promote stand-alone infrastructures vis-a-vis empowered total linkage. Compellingly predominate market-driven testing procedures before an expanded array of deliverables. Completely promote effective content with effective applications. Monotonectally pursue sustainable platforms before leading-edge convergence.
                </p>
                <p>Proactively benchmark client-centered potentialities before prospective catalysts for change. Holisticly mesh one-to-one content for efficient benefits. Conveniently fabricate worldwide technology without pandemic innovation. Quickly monetize mission-critical "outside the box" thinking whereas impactful convergence. Enthusiastically.
                    Proactively benchmark client-centered potentialities before prospective catalysts for change. Holisticly mesh one-to-one content for efficient benefits. Conveniently fabricate worldwide technology without pandemic innovation. Quickly monetize mission-critical "outside the box" thinking whereas impactful convergence. Enthusiastically.
                </p>
            </div>
        </div>

    )
}
export default Speaker;