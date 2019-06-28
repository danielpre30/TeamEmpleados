import React from 'react';

const FormEmployee = ({ name, job, area, points, imgSrc, onSubmit, handleChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Name" onChange={e => {
                handleChange(e, "nameEmployee");
            }} value={name} />
            <input type="text" placeholder="Job" onChange={e => {
                handleChange(e, "jobEmployee");
            }} value={job} />
            <input type="text" placeholder="Area" onChange={e => {
                handleChange(e, "areaEmployee");
            }} value={area} />
            <input type="number" placeholder="Points" onChange={e => {
                handleChange(e, "pointsEmployee");
            }} value={points} />
            <input type="text" placeholder="URL image" onChange={e => {
                handleChange(e, "imgSrcEmployee");
            }} value={imgSrc} />
            <button type="submit" className="">Create!</button>
        </form>
    );
}

export default FormEmployee;