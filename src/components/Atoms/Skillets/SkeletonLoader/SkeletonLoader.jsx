import "./SkeletonLoader.scss";

const SkeletonLoader = () => {
    return (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-price"></div>
                    <div className="skeleton-button"></div>
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
