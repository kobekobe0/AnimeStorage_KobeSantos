import React from 'react'
import './sidenav.css'
import { Sidenavcontent } from './Sidenavcontent'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

//TODO
//add id to each li so it can chage the background color

function SideNav({ handleHide }) {
    const [num, setNum] = useState(0)
    console.log(num)
    const history = useHistory()
    console.log(history.location.pathname)

    return (
        <div className="sidenav">
            <Nav.Link
                onClick={handleHide}
                smooth={true}
                eventKey="4"
                as={Link}
                to="./"
            >
                <h1 className="title">AnimeStorage</h1>
            </Nav.Link>
            <hr />
            <ul>
                {Sidenavcontent.map((val) => {
                    return (
                        <li
                            onClick={handleHide}
                            style={
                                history.location.pathname == val.link
                                    ? {
                                          backgroundColor:
                                              'rgba(0, 0, 0, 0.438)',
                                      }
                                    : null
                            }
                        >
                            <Nav.Link
                                smooth={true}
                                eventKey="4"
                                as={Link}
                                to={val.link}
                                onClick={() => setNum(val.number)}
                            >
                                <h1>{val.title}</h1>
                            </Nav.Link>
                        </li>
                    )
                })}
            </ul>
            <hr />
            <div className="sidenavFooter">
                <h5>NOTE!</h5>
                <p>
                    This webapp only stores the list data in localstorage, thus,
                    if you clear the data of your browser of choice, all items
                    in your list will be removed.
                </p>
            </div>
        </div>
    )
}

export default SideNav
