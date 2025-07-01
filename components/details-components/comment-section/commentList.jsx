import Image from "next/image";
import { Rating } from 'react-simple-star-rating';
import { Tooltip } from "antd";
import { CheckCircleFilled, LikeOutlined, DislikeOutlined, MessageOutlined } from "@ant-design/icons";

const mockComments = [
  {
    id: 1,
    username: 'Ali',
    text: 'Zo‘r mahsulot!',
    rating: 4,
    time: '58 daqiqa oldin',
    replys: [
      {
        username: 'Bobur (egasi)',
        text: 'Rahmat! Sizga yoqqanidan xursandmiz.',
        time: '8 daqiqa oldin'
      }
    ]
  },
  {
    id: 2,
    username: 'Laylo',
    text: 'Yaxshi ishlayapti, rahmat!',
    rating: 5,
    time: '1 soat oldin',
    replys: []
  },
    {
    id: 1,
    username: 'Ali',
    text: 'Zo‘r mahsulot!',
    rating: 4,
    time: '58 daqiqa oldin',
    replys: [
      {
        username: 'Bobur (egasi)',
        text: 'Rahmat! Sizga yoqqanidan xursandmiz.',
        time: '8 daqiqa oldin'
      }
    ]
  },
  {
    id: 2,
    username: 'Laylo',
    text: 'Yaxshi ishlayapti, rahmat!',
    rating: 5,
    time: '1 soat oldin',
    replys: []
  },
    {
    id: 1,
    username: 'Ali',
    text: 'Zo‘r mahsulot!',
    rating: 4,
    time: '58 daqiqa oldin',
    replys: [
      {
        username: 'Bobur (egasi)',
        text: 'Rahmat! Sizga yoqqanidan xursandmiz.',
        time: '8 daqiqa oldin'
      }
    ]
  },
  {
    id: 2,
    username: 'Laylo',
    text: 'Yaxshi ishlayapti, rahmat!',
    rating: 5,
    time: '1 soat oldin',
    replys: []
  },
];

export function CommentList() {
  return (
    <div style={{maxHeight:'500px', overflowY: 'auto'}} className="border rounded-5 p-5 bg-white">
      <h5 className="mb-4 fs-1 d-flex align-items-center gap-2">
        Izohlar
        <span className="rounded-5 fs-4 text-white bg-success px-3 py-1">
          {mockComments.length}
        </span>
      </h5>

      {mockComments.length === 0 ? (
        <p className="text-muted fs-3">Hali Izohlar Mavjud Emas</p>
      ) : (
        mockComments.map((comment) => (
          <div key={comment.id} className="mb-4 pb-4 border-bottom">
            {/* Main Comment */}
            <div className="d-flex align-items-start gap-3">
              <Image
                src="/static/img/ozodbek.png"
                alt="avatar"
                width={50}
                height={50}
                className="rounded-circle"
              />
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong className="fs-5">{comment.username}</strong>
                    <span className="text-muted ms-2">{comment.time}</span>
                  </div>
                  <div>
                    <Rating
                      readonly
                      allowFraction
                      initialValue={comment.rating}
                      size={20}
                      fillColor="orange"
                      emptyColor="gray"
                    />
                  </div>
                </div>
                <p className="mt-2 mb-2 fs-5">{comment.text}</p>
                <div className="d-flex gap-4 text-muted fs-6">
                  <Tooltip title="Javob yozish">
                    <span><MessageOutlined /> Javob berish</span>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replys.map((reply, index) => (
              <div key={index} className="d-flex align-items-start gap-3 mt-4 ms-5 ps-3 border-start border-3 border-success">
                <Image
                  src="/static/img/ozodbek.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <strong className="fs-6 text-success">{reply.username}</strong>
                    <CheckCircleFilled className="text-success" />
                    <span className="text-muted small">{reply.time}</span>
                  </div>
                  <p className="mt-1 mb-0">{reply.text}</p>
                  <div className="d-flex gap-4 text-muted fs-6">
                    <Tooltip title="Javob yozish">
                      <span><MessageOutlined /> Javob berish</span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
