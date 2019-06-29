import React from 'react';

const FormPrize = ({ name, description, points, imgSrc, onSubmit, handleChange }) => {
    return (
        <form className="form-add" onSubmit={onSubmit}>
            <div className="form-wrapper">
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" onChange={e => {
                        handleChange(e, "namePrize");
                    }} value={name} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input name="description" type="text" onChange={e => {
                        handleChange(e, "descriptionPrize");
                    }} value={description} />
                </div>
                <div>
                    <label htmlFor="points">Points</label>
                    <input name="points" type="number" onChange={e => {
                        handleChange(e, "pointsPrize");
                    }} value={points} />
                </div>
                <div>
                    <label htmlFor="imgSrc">URL image</label>
                    <input name="imgSrc" type="text" onChange={e => {
                        handleChange(e, "imgSrcPrize");
                    }} value={imgSrc} />
                </div>
            </div>
            <div className="wrapper-button">
                <button type="submit" className="">Create!</button>
            </div>
        </form>
    );
}

export default FormPrize;