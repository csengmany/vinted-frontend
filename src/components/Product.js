const Product = ({ key, index, offer }) => {
    return (
        <div className="product" onClick={() => {}}>
            <div>
                {offer.owner.account.avatar && (
                    <span className="user-avatar">
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

            <div>
                <span>{offer.product_price}</span>
                <span>
                    {offer.product_details.map((detail, index) => {
                        return detail.TAILLE;
                    })}
                </span>
                <span>
                    {offer.product_details.map((detail, index) => {
                        return detail.MARQUE;
                    })}
                </span>
            </div>
        </div>
    );
};
export default Product;
