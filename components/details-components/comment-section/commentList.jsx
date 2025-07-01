import Image from "next/image";
import { Rating } from 'react-simple-star-rating'


const mockComments = [
  { id: 1, username: 'Ali', text: 'Zo‘r mahsulot!', rating: 4 },
  { id: 2, username: 'Laylo', text: 'Yaxshi ishlayapti, rahmat!', rating: 5 },
];

export function CommentList() {
  return (
    <div className="border rounded-3 p-5">
      <h5 className="mb-4 fs-1">Izohlar <span  className="rounded-5 fs-3 text-white bg-success p-2">{mockComments?.length}</span> </h5>
      {mockComments.length === 0 ? (
        <p className="text-muted fs-3">Hali Izohlar Mavjud Emas</p>
      ) : (
        mockComments.map((comment) => (
          <div  key={comment.id} className="p-3 mb-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4 ">
              <Image
                  src={
                      
                      '/static/img/ozodbek.png'
                  }
                  alt='seller-profile'
                  height={50}
                  width={50}
              />
              <div>
                  <strong className="fs-4">{comment.username}</strong>
                  <p className="mb-0">{comment.text}</p>
              </div>
            </div>
            <div>
              <Rating
                readonly
                allowFraction
                initialValue={comment.rating}
                size={25}
                fillColor="orange"
                emptyColor="gray"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}