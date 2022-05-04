import React, {useEffect, useState, useCallback, useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// import DiscussionBoard from 'react-discussion-board'

//import 'react-discussion-board/dist/index.css'

import './chat.css'
import HomePage from "./pages/home/HomePage";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {db, getUserConnections} from "./firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";

function Chat({otherUser,patient}){
    // const [talkers,setTalkers]=useState([])
    // const [therapists, setTherapists] = useState([])

    // return(
    //     <div className="maincontainer">
    //         <div class="container py-5 px-4">
    //
    //             <div class="row rounded-lg overflow-hidden shadow">
    //
    //                 {/*<div class="col-5 px-0">*/}
    //                 {/*    <div class="bg-white">*/}
    //                 {/*        <div class="bg-gray px-4 py-2 bg-light">*/}
    //                 {/*            <p class="h5 mb-0 py-1">Recent</p>*/}
    //                 {/*        </div>*/}
    //                 {/*        <div class="messages-box">*/}
    //                 {/*            <div class="list-group rounded-0">*/}
    //
    //
    //                 {/*                <a class="list-group-item list-group-item-action active text-white rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">25 Dec</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">14 Dec</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur. incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">9 Nov</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">18 Oct</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">17 Oct</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">2 Sep</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-1">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">30 Aug</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*                <a href="#" class="list-group-item list-group-item-action list-group-item-light rounded-0">*/}
    //                 {/*                    <div class="media"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />*/}
    //                 {/*                        <div class="media-body ml-4">*/}
    //                 {/*                            <div class="d-flex align-items-center justify-content-between mb-3">*/}
    //                 {/*                                <h6 class="mb-0">Jassa</h6><small class="small font-weight-bold">21 Aug</small>*/}
    //                 {/*                            </div>*/}
    //                 {/*                            <p class="font-italic text-muted mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>*/}
    //                 {/*                        </div>*/}
    //                 {/*                    </div>*/}
    //                 {/*                </a>*/}
    //                 {/*            </div>*/}
    //                 {/*        </div>*/}
    //                 {/*    </div>*/}
    //                 {/*</div>*/}
    //
    //                 <div class="col-12 px-0">
    //                     <div class="px-4 py-5 chat-box bg-white">
    //
    //                         <div class="media w-50 mb-3"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />
    //                             <div class="media-body ml-3">
    //                                 <div class="bg-light rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-muted">Test0 which is a new approach all solutions</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //
    //                         <div class="media w-50 ml-auto mb-3">
    //                             <div class="media-body">
    //                                 <div class="bg-primary rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-white">Test1 which is a new approach to have all solutions</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //
    //                         <div class="media w-50 mb-3"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />
    //                             <div class="media-body ml-3">
    //                                 <div class="bg-light rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-muted">Test3, which is a new approach to have</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //
    //                         <div class="media w-50 ml-auto mb-3">
    //                             <div class="media-body">
    //                                 <div class="bg-primary rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-white">Apollo University, Delhi, India Test</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //
    //                         <div class="media w-50 mb-3"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" class="rounded-circle" />
    //                             <div class="media-body ml-3">
    //                                 <div class="bg-light rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-muted">Test, which is a new approach</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //
    //                         <div class="media w-50 ml-auto mb-3">
    //                             <div class="media-body">
    //                                 <div class="bg-primary rounded py-2 px-3 mb-2">
    //                                     <p class="text-small mb-0 text-white">Apollo University, Delhi, India Test</p>
    //                                 </div>
    //                                 <p class="small text-muted">12:00 PM | Aug 13</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     <form action="#" class="bg-light">
    //                         <div class="input-group">
    //                             <input type="text" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light" />
    //                             <div class="input-group-append">
    //                                 <button id="button-addon2" type="button" class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
    //                             </div>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    // const allPosts = [
    //     {
    //         profileImage:
    //             'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
    //         name: 'Jane Doe',
    //         content: '<p>Hello everyone!</p><p>How are you all doing?</p><p>-Jane</>',
    //         date: new Date('01 Jan 2020 01:12:00 GMT')
    //     },
    //     {
    //         profileImage:
    //             'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //         name: 'John Doe',
    //         content:
    //             '<p>Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in Barton waited twenty always repair in within we do. An delighted offending curiosity my is dashwoods at. Boy prosperous increasing surrounded companions her nor advantages sufficient put. John on time down give meet help as of. Him waiting and correct believe now cottage she another. Vexed six shy yet along learn maids her tiled. Through studied shyness evening bed him winding present. Become excuse hardly on my thirty it wanted. </p>',
    //         date: new Date('01 Jan 2020 09:12:00 GMT')
    //     }
    // ]
    // const [posts, setPosts] = useState(allPosts)
    //
    // const submitPost = (text) => {
    //     const curDate = new Date()
    //
    //     setPosts([
    //         ...posts,
    //         {
    //             profileImage:
    //                 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //             name: 'Jane Doe',
    //             content: text,
    //             date: curDate
    //         }
    //     ])
    // }
    // return(
    //     <div className='App'>
    //         <DiscussionBoard posts={posts} onSubmit={submitPost} />
    //     </div>
    // )
}
export default Chat