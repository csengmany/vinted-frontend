import Product from "../components/Product";
const Offers = ({ data, page, setPage, limit, setLimit }) => {
    console.log("limit", limit, "page", page);
    const displayLimitOffers = (event) => {
        console.log(limit);

        setLimit(5);
    };
    return (
        <div className="offers" onSubmit={displayLimitOffers}>
            <form action="/offers">
                <label>Nombre d'articles:</label>
                <select name="limit" id="limit">
                    <optgroup label="Nombre d'articles">
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </optgroup>
                </select>

                <input type="submit" value="Submit" />
            </form>
            <form action="/offers">
                <label>Page:</label>
                <select name="page" id="page">
                    <option value="5">1</option>
                    <option value="10">2</option>
                </select>

                <input type="submit" value="Submit" />
            </form>
            <div className="products">
                {!limit
                    ? data.offers.map((offer, index) => {
                          // console.log(offer._id);
                          return (
                              <Product
                                  key={offer._id}
                                  offer={offer}
                                  id={offer._id}
                              />
                          );
                      })
                    : data.offers.slice(0, limit).map((offer, index) => {
                          // console.log(offer._id);
                          return (
                              <Product
                                  key={offer._id}
                                  offer={offer}
                                  id={offer._id}
                              />
                          );
                      })}
            </div>
        </div>
    );
};
export default Offers;
