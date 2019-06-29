import React from 'react';

const FormEmployee = ({ name, job, area, points, imgSrc, onSubmit, handleChange }) => {
    return (
        <form className="form-add" onSubmit={onSubmit}>
            <div className="form-wrapper">
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" onChange={e => {
                        handleChange(e, "nameEmployee");
                    }} value={name} />
                </div>
                <div>
                    <label htmlFor="job">Job</label>
                    <input name="job" type="text" onChange={e => {
                        handleChange(e, "jobEmployee");
                    }} value={job} />
                </div>
                <div>
                    <label htmlFor="area">Area</label>
                    <input name="area" type="text" onChange={e => {
                        handleChange(e, "areaEmployee");
                    }} value={area} />
                </div>
                <div>
                    <label htmlFor="points">Points</label>
                    <input name="points" type="number" onChange={e => {
                        handleChange(e, "pointsEmployee");
                    }} value={points} />
                </div>
                <div>
                    <label htmlFor="imgSrc">URL image</label>
                    <input name="imgSrc" type="text" onChange={e => {
                        handleChange(e, "imgSrcEmployee");
                    }} value={imgSrc} />
                </div>
            </div>
            <div className="wrapper-button">
                <button type="submit" className="">Create!</button>
            </div>
        </form>
    );
}

export default FormEmployee;