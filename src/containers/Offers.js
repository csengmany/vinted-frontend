import Product from "../components/Product";

const Offers = ({ data, page, setPage, limit, setLimit }) => {
    console.log(limit);
    return (
        <div className="offers" onSubmit={() => {}}>
            <form action="">
                <select
                    name="limit"
                    id=""
                    onChange={(event) => {
                        setLimit(event.target.value);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
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
