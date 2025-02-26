import React from 'react'
import DefaultVideoContent from './default-video'

function PlayListsCard({ product, isPlay, setIsPlay }) {
    return (
        <div className='play_lists_container'>
            <div style={{ padding: "20px 39px ", borderBottom: "1px solid #312F304D", marginBottom: "5px" }}>
                <p className='m-0' style={{
                    fontWeight: 500,
                    fontSize: "20px",
                }}>Playlist 32 ta video</p>
            </div>

            <div style={{
                width: "100%",
                height: "100%",
                maxHeight:"796px",
                overflowY: "scroll",
                borderRadius: "5px"
            }}>

                <div className='play_lists_card_main'>
                    <div className='play_lists_card'>
                        <div style={{ height: "100%", minWidth: "151px" }}>
                            <DefaultVideoContent type={"playlists"} isPlay={isPlay} product={product} setIsPlay={setIsPlay} />
                        </div>
                        <div className='w-100 d-flex flex-column  justify-content-between  py-2 align-items-start '
                            style={{ height: "100%" }}
                        >
                            <p className='m-0' style={{ fontWeight: 500, fontSize: "15px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, commodi.</p>
                            <p style={{
                                color: "#fff",
                                padding: "1px 5px",
                                borderRadius: "4px",
                                backgroundColor: "#00A44F",
                                margin: "0"
                            }}>10:24</p>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default PlayListsCard