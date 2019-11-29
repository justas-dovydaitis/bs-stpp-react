import React from 'react';
import { Speaker } from '../Speakers';

class Lecture extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container lecture'>
                <div className='row'>
                    <h1 className='display-1 mt-5'>
                        Ted Neward @tedneward - Modern Architecture {/*title*/}
                    </h1>
                </div>
                <div className='row my-3'>
                    <div className='col'>
                        {/*time and place*/}
                        <div className='row font-weight-bold'>
                            Saturday, May 4 10:10am - 11:10am
                        </div>
                        <div className='row font-weight-bold'>
                            Alpha
                        </div>
                    </div>
                    <div className='col-2 align-self-end'>
                        1 2 3
                 </div>
                </div>
                <div className='row my-3'>
                    Distinctively disseminate seamless intellectual capital whereas prospective systems. Phosfluorescently enable prospective ROI through market-driven leadership. Completely visualize timely convergence without revolutionary sources. Progressively supply client-based supply chains after fully tested intellectual capital. Dramatically orchestrate frictionless catalysts for change without proactive markets.
                    Quickly scale seamless alignments with fully tested intellectual capital. Authoritatively transform multimedia based value for turnkey ROI. Dynamically engineer interactive users after stand-alone communities. Energistically strategize frictionless vortals and 24/7 schemas. Rapidiously synthesize.
                    Distinctively disseminate seamless intellectual capital whereas prospective systems. Phosfluorescently enable prospective ROI through market-driven leadership. Completely visualize timely convergence without revolutionary sources. Progressively supply client-based supply chains after fully tested intellectual capital. Dramatically orchestrate frictionless catalysts for change without proactive markets.
                    Quickly scale seamless alignments with fully tested intellectual capital. Authoritatively transform multimedia based value for turnkey ROI. Dynamically engineer interactive users after stand-alone communities. Energistically strategize frictionless vortals and 24/7 schemas. Rapidiously synthesize.
                </div>
                <div className='row'>
                    <h3 className='font-weight-bold'>Speakers:</h3>
                </div>
                <div className='row'>
                    <Speaker />
                    <Speaker />
                </div>
            </div>
        )
    }
}

export default Lecture;