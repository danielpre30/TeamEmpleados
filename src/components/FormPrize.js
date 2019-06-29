import React from 'react';

const FormPrize = ({ name, description, points, imgSrc, onSubmit, handleChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Name" onChange={e => {
                handleChange(e, "namePrize");
            }} value={name} />
            <input type="text" placeholder="Description" onChange={e => {
                handleChange(e, "descriptionPrize");
            }} value={description} />
            <input type="number" placeholder="Points" onChange={e => {
                handleChange(e, "pointsPrize");
            }} value={points} />
            <input type="text" placeholder="URL image" onChange={e => {
                handleChange(e, "imgSrcPrize");
            }} value={imgSrc} />
            <button type="submit" className="">Create!</button>
        </form>
    );
}

export default FormPrize;