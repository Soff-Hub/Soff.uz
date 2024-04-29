import React, { forwardRef } from 'react';

const Input = forwardRef(({ className = "d-block", name, error, placeholder, type = 'text', accept, InputClassName,defaultValue, ...rest }, ref) => {
    return (
        <div className={`${className} p-0`}>

            <input
                id={name}
                name={name}
                type={type}
                ref={ref}
                placeholder={placeholder}
                className={error ? `border border-danger ${InputClassName}` : InputClassName}
                autoComplete="off"
                spellCheck="false"
                aria-invalid={error ? 'true' : 'false'}
                {...rest}
                accept={accept}
                defaultValue={defaultValue}
            />
            {error && (
                <p className={"my-2  text-danger"}>
                    {error}
                </p>
            )}
        </div>
    );
}
);

export default Input;
