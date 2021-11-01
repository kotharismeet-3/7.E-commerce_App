import React from 'react';
import {BsStar} from 'react-icons/bs';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';

const Rating = ({value, text}) => {
    return (
        <div className="flex">
          <span>
            { value >=1 ? 
                <i><FaStar /></i> : 
                value >= 0.5 ? 
                    <i><FaStarHalfAlt /></i> :
                    <i><BsStar /></i>
            }
          </span> 

          <span>
            { value >=2 ? 
                <i><FaStar /></i> : 
                value >= 1.5 ? 
                    <i><FaStarHalfAlt /></i> :
                    <i><BsStar /></i>
            }
          </span>

          <span>
            { value >=3 ? 
                <i><FaStar /></i> : 
                value >= 2.5 ? 
                    <i><FaStarHalfAlt /></i> :
                    <i><BsStar /></i>
            }
          </span>

          <span>
            { value >=4 ? 
                <i><FaStar /></i> : 
                value >= 3.5 ? 
                    <i><FaStarHalfAlt /></i> :
                    <i><BsStar /></i>
            }
          </span>

          <span>
            { value >=5 ? 
                <i><FaStar /></i> : 
                value >= 4.5 ? 
                    <i><FaStarHalfAlt /></i> :
                    <i><BsStar /></i>
            }
          </span> 
          <span>({text})</span>
        </div>
    )
}

export default Rating;
