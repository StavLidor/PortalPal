import React from 'react';
import './topbar.css'
import {NotificationsNone,Language,Settings} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
function Topbar(props) {
    return (
        <div className='topbar'>
            <div className='topbarWrapper'>
                <div className='topLeft'>
                    <img src="/imges/011835cfbf.jpg" alt="" className='topAvatar'/>
                    <div className="topbarIcontainar">
                        <NotificationsNone/>
                        <span className='topIconeBadge'>2</span>
                    </div>
                    <div className="topbarIcontainar">
                        <Language/>
                    </div>
                    <div className="topbarIcontainar">
                        <Settings/>
                    </div>


                </div>
                <div className='topRight'>
                        <span className='logo'>פורטל</span>
                </div>

            </div>
        </div>
    );
}

export default Topbar;