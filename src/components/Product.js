import { Link } from "react-router-dom";

const Product = ({ id, offer }) => {
    return (
        // if click on product it will link to the offer page
        <Link to={`/offer/${id}`}>
            <div className="product">
                <div className="product-owner">
                    {offer.owner.account.avatar && (
                        <span className="product-owner-avatar">
                            <img
                                src={offer.owner.account.avatar.secure_url}
                                alt=""
                            />
                        </span>
                    )}

                    <span>{offer.owner.account.username}</span>
                </div>

                <span className="product-img">
                    <img src={offer.product_image.secure_url} alt="" />
                </span>

                <div className="product-details">
                    <span>{offer.product_price} €</span>

                    <span>{offer.product_details[1].TAILLE}</span>
                    <span>{offer.product_details[0].MARQUE}</span>
                </div>
            </div>
        </Link>
    );
};
export default Product;
