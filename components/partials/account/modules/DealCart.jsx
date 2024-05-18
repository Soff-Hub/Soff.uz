import React from 'react'

export default function DealCart() {
  return (
    <div className="border border-2 rounded-3 p-3">
    <div className="d-md-flex justify-content-between  ">
        <h3 className="text-success">
            Mustqil ish kerak
        </h3>
        <div>
            {' '}
            <span className="fw-medium">
                narxi:
            </span>{' '}
            <span className="text-success fs-3 fw-bold">
                23 000 so'm{' '}
            </span>
        </div>
    </div>
    <p>
        Lorem ipsum dolor sit,
        amet consectetur
        adipisicing elit. Libero
        cupiditate quaerat amet
        minima vel at! Quaerat,
        enim? Repellendus
        provident saepe,
        repellat iusto odio
        veritatis voluptas animi
        numquam ea officiis ad!
    </p>
    <div className="d-flex justify-content-between gap-4">
        <div className="text-end">
            <span className="text-success fs-3 fw-medium">
                <i class="fa-solid fa-calendar-days"></i>
            </span>{' '}
            <span className="fw-medium ">
                17-iyul 2025-yil
            </span>
        </div>
        <div>
            <span className="text-success fs-3 fw-medium">
                arizalar :{' '}
            </span>{' '}
            <span className="fw-medium ">
                {' '}
                2
            </span>
        </div>
    </div>
</div>
  )
}

