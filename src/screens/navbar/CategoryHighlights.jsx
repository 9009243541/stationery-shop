import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const categoryItems = [
  {
    title: "Notebook",
    offer: "Up To 30% OFF",
    image:
      "https://image.made-in-china.com/202f0j00acCYhEfMsObU/Exercise-Book-School-Copy-Book.jpg",
  },
  {
    title: "Classmate",
    offer: "Up To 20% OFF",
    image: "https://5.imimg.com/data5/SX/RS/MY-3747864/classmate-notebook.jpg",
  },
  {
    title: "Pen",
    offer: "Up To 25% OFF",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    title: "Classmate",
    offer: "Up To 15% OFF",
    image:
      "https://tiimg.tistatic.com/fp/1/007/602/super-quality-classmate-notebook-with-high-quality-paper-in-rectangle-shape-917.jpg",
  },

  {
    title: "Geometry Box",
    offer: "Up To 18% OFF",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEA8PFRAWEBUPFRUXEA8QHQ8VFRUWFhYVFRcYHSkiGBolGxUVITEhJSorLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGismHSYtLS4tLy0tLS0tLS0tLS0tLS8tLS0tLSstLS0rLS0rLS0tLS0tLS0tNi0tLS0tLS4tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHCAL/xABIEAABAwIDAwkFBQUFBwUAAAABAAIDBBEFEiEGMUETIjJRYXGBkaEHQlKSsRRicoLBFSNDotEzwtLh8BZTY4Ozw/E0VHOTo//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACcRAQACAQQCAgEEAwAAAAAAAAABAhEDEiExQVEEE/AUImGxcaHR/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAiIgIiICIiAiIgIiogqioiCqKiIKoqIgqioiCqKiIKoqIgqiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIi1u0GMx0UDp5A8gWADRcuJ3DqHeVYiZnEDZLUYrtPQUulRWU8Z+EyNv8o19Fwbb/AG9xOd9uVMVI7RrYi5nhI/eT5DsUC368Tx61u2nNZxZnc9LT+1jBWm32xzvw09S4eeRfdL7VMFkNhWhp+/DURD5nMA9V52iwaV1O6pzQtjDXPDXShr5WscGPdG33gHOA3i5va9lbrMNkha0yWDy3OY+cXwsNsrpRa0ea4sCb7tBcXzgy9Z4bjFLUjNT1MEo645WSfQrOXjNhyuDmkhw3OBLSO4jUKT4R7QcWpbCOtle0e5Laceb+cPAhTC5epUXEcI9ucrbCsoWO63wyFh/+t9x/MpthHtXwiosDUGB3VMwxAfn1Z6phcpwisUdbFMwPhljkYdQ5j2yA9xabK+oCIiAiIgIiICIiAiIgIiICIiAiIgIix6+tjgjdLK9rGCwJJA1JsBrxJIA70FvFcSjponSyHQaAcXngAuN45WVctQ+qbKQ5zeTLOkx0f+6cw6Obqe3UkWOqrtZtDUT1ThM0xtbcRMvcZL9IHiTx8lj09WCvqaGhFK5nuXC9rZ4RyYNdmimjDWu0sSSAT1E6gd+7TtKiuKYc+lfldcsJ5rv7p7fquoVNNHKLOCjOI0TmAwyAPiO4Hq+67gQumrpRqR/JW0SjNFi9RC0MjmeGB4kDDZ7Q4EODgxwIBuAb24LZxbUvNPJSywQuikLC9zc8Uji14c6Rzg797ISL3kuL8CNFpK6kMDuJjJ0JFiOx3b2q0CvmWrNZxLacCXB6uZjSG08IjJd+7go80m4Frxmu0DVzHPvc3aTbKsP/AGQZK28FdR8s6YRMp/tDJDYi+YzWbe4BdYMuAWg2N7RNfUUjmEOY5zXDcWktIuLGxHYSPFZVmvwipDGy8jIY3yCGNwaTyziC4cmOk8ENJDgLFWqygmhyctE+MvaXta8ZXFt7Ziw85oPC4F+C2cG1lWDEJpOXZHO2oDZQHkubazeUPOa3mjQEDTq0WypdoKKaaV9ZBKbt/dmaeor2xuJcX827S3NdtiA62XdrcBF6Opkhdnhlkjf8Ub3xnzaQphhHtUxensDUNnb8M0Yfp+JuV3mSofXFhlkMYaIy8loaZCA0nQAyAOIt8QBVlDLtuD+3GI2FZRSMO4vhe2Ud5a7KR4Eqb4P7QsKqrCOtia87mSEwO7gH2v4Ly3dFMLl7LY4EAggg6gg3uqryFhWM1VIb0tTPDxsyRzWnvZ0T4hTfCPbJicNhMIKhv3mck4/mZp/KphcvQyLl2Ee2yhksKmCogPEgCdo8W2d/Kpxg+1eH1f8A6esgefhDw13ix1nDyUVuUREBERAREQEREBERBRzgASSAALk7rBedPahtg/Ep+TjJFFG4iMAkcq4acqf7vUO0rs/tIqXRYVWOZcOMXJ3HAPcGH0cV5zpnBoyyNvGeI1ynrH9Fqqw6ds5JFitC3lQDLH+7l4FrwNJGnhmGvfmGtlocVwqajdzruiJs2QDd1B490+h9FpcBxCXDp21MP7yE82RgOksfEfiG8HgewldlpX09dTtmhLZIZGkagfmY9p3EbiCvbpa8x25Wrj/DmdPVrJma2VuV276doWdj2yT4SZKYFzN5j1JZ+D4h2b+9aCGZe6totGYcpr5hh1VHYmORocDuNr5h+p7FoKzZ8dKF1uw6g/0Uzc5rxlcLj6do6lg1EGXUnT4v8Y4fi81LUreMWhuLe0CnjfGbSsLT18D3FAVM5WaFr2gj4SAQe5aarwKM6xOLD8J5wP8ARePU+HMc1baVF9VFPLF02G3xDnD/AC8V8NeDuK8lqzWcSiqIiyCIiCqXVERX0hA6l8qt0G9wjbDEqS3IV1Q1o9xz+Vb3BklwPCym+Ee22sZYVVNBMOLmF0DvI5gT5Lll0TC5eicI9sOFTWErpqdx0tJEXD548wA77KaYZi9NUtzU9RDK3fdkjH/Q6LyGqxPLHB7HOa8bnNJaR3EahTC5eyUXl7CPaLi1LYMrXvYPcmDZwe9zuf5OC6Psz7aoZC2PEIDCTpyseaRne5vSb4ZlMK60is0dXHNG2WKRj43DM17XBwcOsEb1eUBERBH9uJmCjLJOhLLFTE/Dyrw0HwJC4Hi2FPppXRuFnebZBwI6wvQO2WDGtopoGOyyHLJG74ZY3B8Z+ZoXHsYxE1ALJIQydhyyRON8jxvyu0IvvB4gg6pDUIjHzScpLCd46TXd4WzwDH6nD5DLABkcRykdy6Oa3WBqx1tzhe3aNFhyxsBs5z4jwEjC5p7nt19E+wy2zMbnb8UThKPEN1HiFvK4y7Ps7tRR4i20Tw2a13QvIDh1lvxjtHjZY+0Gycc93t5k3xAaP/GOPfv+i4ryouCbZgbg9BzSNxBG4qQ4ZtnXQWDaqR7fhmAnHzHn+q601Zq5zp+mbiFBNTuyzMLep29r/wALv03qwHreQ+0FkreTqqWJ7SNcjwL/APLk/wAS1td9jdd9PM6PjyUzXNA/DLq3wJ8V7tP5FbduU1mGvkgHu2t8J3flPurEdFrYXv8ACbA+HB3gr4qm3tcX7wfIjQhXS5rhY2IXpifRzDWPZfeFq6zBmP1F2u6wpFJT33G/Y7h3O3+d194bhb55mQt5pNyXO6MTBq57nDTKBc626lLxS0fubiyDS4bKz3gfD+ismKT4L/hIPpvXc8X2gpWwx4ZhtKyosMgkfCJQ5x6To2kc9xNzm3d4UNbsuTXRUU4DZHSRxvLSCY+UAOh3XAcvF9FbRM9f8a4c6MtukCO8EKomb1hdH202Ldhr2MFXHNnBcGmMgtaNLu1Ol9N+tjoopJSM9+Bp7WkfQ/1WI+NujNZ4NrShw61W62LsPpT8TT2tcPUaK3+x4j0JQe54Kz+lt4mE2sK6LJkwR43OKsnDHj3j9Vmfj3g2y+Euvr9nv/3norMtK9u92nX1LP02XbK6Cq3VGUZO+Q+QV1lACbcq4nqGUqxo2k2y+EutjBs/I/osqXf8t1vPLZbKn2KqH/wZB+KSNv63V/TXSZiO5hd2D21nwqYFpL6Vzv3sN9CDvez4ZB67jwI9N0NXHPGyaJwdG9oe1w95pFwV5zpvZvK7pPjb+eR/pYfVdo9mmGupaEU7pM4ZI7Kcpbla7nZdXHcSfNY1NGaxmSLVniJStERcGhc42y2Zjmlde7JN8crRrlJJyuHvNBJ0O7gRddHWLX0TJm5Xb94I3tKxeszHHbVZx24VUYNXQ3BiEzOuMh9x2xnnX7AD3rViKmc+zozHKNbDNC5v5dCPJdkrMKlivduZvxAX8xwWFNh8M4yzRRvb1Oa19u4EGxXONeY4tDptienNvsmbmumz9QnjbNbucQHeRXy/Z2I72tYTqCySSx8DeyndRsLE4HkJZYvu5zI3yfe35S1a2o2bxOAc1sdRGNbDK0+DX3aNCffC711KyxMTCFy7Ly/wyX9jXwv9H5CsGTBZ2acnK09sbmf9NzlKp6ksceVjfEb7nNcwX6muOh8CVlQ1zrWDrjqNnDyK6RET0zMoBPh0h6TJD28nMfIuj/VYclLUM/s3T9zmOcPM6hdQE7DvZbtabeh0X0AD0JB3O5h893qulb2r1KcOSvxSrj6bCB1ljx67lcZtFUAEWNja4GfnW1Fxx1XVJS4Cz2HKdN2YH9CtNVYJTSasBid9zQfIdPKy9NPkz5lOPMNHg+0tI0ML24hS1AFuXppQ/Met8Tg2w7Gu4cV84XtXyeKR1M87pomT8o6UxuY6ZrGnKcnAmzRa6yKnA52dDJK3sIY75XG3kVrZGtByvaWu6nNLfrvXaIi3Vl4dW2doZKqWWXFKBxq6m8tM85qmnjjyXZE50Rswix6Vr6WNzZaGHZ4VeLHD3Uv2QxQmSZ0UslUyQ80t5MvaOTaQ4b9bm1locOr+Sbkgq62nFuiyZ+UnS5s0i19Tu4rc7OY1V0MdQKcxTumBeZXPlfIw5TY88621OW2879Quf1atczE/n9I+PaNsy2OeJmE07Zgc7JI45ZZ3xyNPOztsRG0aC5dqTuFtYDi+GVlPYVOHTR33FzHgHudaxXVdg9oG0lNU000nI1UkjpGVE0T5GvdYNtLax0LXa3tqdbrPq8cENNNA37FUTVDTGxlNWTz2mcC1jmxSXEYuQdHDduUzqRO2eVy4I59vcezuJH9FlU81N/Elrvyuj/UruuOUVBh1JTRVhldVuaC58LQXEggvdlc4NDbnKL6+q09TsdUTZpoo6IUTmtdE6sdyT5A5oN3NawhoJJtex03KxqVxnqGZmZ8f7c5onYWek+s/O8/9srd0lPhJtYxH/wCR8n/cK+tptmnUeU1eGRiN2jZoZLscSL2BaQQe8C6xaPZOjnpJ6uOtjgdETeF8pLjYA6Ny5tb6Wvda3RjPDM0z7SOkoKMaxxU3e1sR9QtjFlG4tHcQFy9mHSNN4aqnceA5YwuPdmA+qym4zXU9uUD8v3g2QH84GvzFb3e3KdHPUunMc34h5hZcL2/E3zC57QbVh1g8Ze0ODh5ZL+V1JqCUyjNHNER2WdbvFhbxV4lidOa9pXDIz4m/MFvtjMSZN9qjYb8lKGHvLf8AL1UMhJhY+eSYZI2l55jRrY218L+C3/shwd8FCZ5QRNVSGqcDe7QQAxpvxDQPFeH5MxH7XbSjynKIi8jsIiogqrE1HG/pMF+vcfMK+ikxnsYH7OA6Lj3HX1V1jC3ePLVZSKbIjpd0sKppopAQ5jXX0OgUYxDYejfcsYYndcZLPHKOaT+IFTJzAd4Vp9MOBI9VJifCxLmVZsVUx3MMzJBwDxlPi5o/uKMYo6spr8rh1S4D3o8sw7yG84DvAXbnU7h1Hu/zVmVgOjh4Ef1U+y9ezES8/R7dRtJAjnBGhF2ad4urv+3NM7p08h7QGNPo79F1jG9lqWp1kgik7HtB+V9szD3G3coPi3sspHXMM09O74XjlG/zHX51uNeJ7TZPho49qaN/RdKw9UjBb5mk/RX5MUjc3nRukj62tbUDxDLkeIWlxL2dV0VzEYZ2/ckDD8r7DwBKjNTBPSvAkZNDJwDmviJ7r2uO5da39SxMT5SmSfDHnmzGF3547fleLDwsvhtMDrBV08nZnDT6E/otEMZkcLTNjmH/ABGAnwcLFfJZRS72ywu7LTN8jZwXauvevlNyTfbamMWkY8tvm1HKtvu1IuLdhK+6TEYC/OQ5puCDG/KYyB7vVr39nbGY8Il30tQ1/ZHK6N3yEgrGqZqphtKX5v8AiRgnzIv6rtX5fuFzCd1bjUkOdV8o/KI/3peHAAE2ub6Xvx4qVz7Q09TTRUuKwTjky0slhcw5rNLWuLe0X1sQdSLLizcSmHw+bh9brNpdp5o7Xa7Q3FnXsbEXAPefNb+7TvjPGPzwOyy4xR1VPBg9GJBE9zWOlmLW8mxr+UcW3OrtDYaDWwWw2lwamrqunwuJsTGQQ8rI8MYXNaAGsiYd97OBPDUHhZcfg2ugfYTRMPA3aWE34kjjoN3b1lbjCMYhZI2alq3xStuRcNdccG77EW010Om7hYpWea29/wA8z5/IOUprdjsGfO6ignqmVYJjBeM7HSAXyu0HmLeKzfaLTQUtDS4XA1oIaHOdlbmDGm978C99ySOp3WrVHt1MyXl5qWhms0/vIrRvsN7szr3093TeorjeNmrqJZ36Znc0b8jBo1vgLeN0ppXtaN3Uf2TMo3JgAOocQVZbQ1UDs8TrkcWlzXf67PRSJkoKvfaGRMfM+2VgzC+5z/dHnqewFei1axGWYvZm4Y6orTT0EouSRLPzbZhcfu36W1OVp0GgkXd4mZWtaOAA8lAvZnhJPKVsgOeQgi41AtzB4NJd3yO6l0BfEteb2mzriI4gREUQVFVEBERAREQEREBUIvvVUQY8lIw8Ld2nosZ9A4dFwPZq1bFFiaVlYtLTSxOHSa76j00WFVUscjS17GOYd7SAQe9p0PipMrEtJG7e0X6xofMLE6XqWov7cvxf2c4bNcthMLuuF3Jfy2LP5VDMU9lUzbmmqY3jg2VpiPzNzA+Iau6VGDX6DyOwi/qFq6jDJ2e5mHW05vTf6LO7UquKS844ps1W02s1LKGj32gSt787LgeNkwvEpSHM+0MygXa2UhzX62LbuBANu7cu/uNjY6Ht0IWoxTZqiqbmamic4++G5HfO2zj5rVfkx5hmdH04zUS0+bLNT5HWvmhkHHjlJLT4FWv2bE/+xqYyfhkBhPnqD5rpeJez6FzMsLwCG5W52ZrAbuc0tv3uzFQXFNh8Qp7nkRKz4ojn/lIDvIFdq6tbdSxNLQ0tXhc0eskTg34rZgfzDRYJgb/4WdBWzQOLWvkjdxbzm+bD+oWScYLv7SCmeesxBp822XRhroaiWPoyOtuIJOo6jZZsOLuGj2O72uB/lI181c/aUf8A7On/AP0+mZDjb2/2bKeLtZEwHwJuVuureOpXdLf4XSyTNzh2UWJtJG6JzgN+Qah58VtoML+21VLSxtcaeK08xP8AFe48yM9rsoFuDcy1eyuzldUVEdTKZI42nMXy5szwQQRGw6m4O82b37l2jYrBY4yXMZlY0kjiXyEAFzj7zrW17gLAALGr8q1o2ZdKx5lKcPpRDGyMcBqesnUnzWSiLnCCIiAqKqICIiAiIgIiICIiAiIgIiICIiC1NTseLPY1w7QCtbUYBE7oFzD35h5H+q26LM1ie4WJmEVqcCnb0crx2HKfI6eq1szHMNntc0/eBbfuPFTxUc0EWIBHUdVytoR4ajUlzmsw6CcWmhikH3mNd9VqX+zzDJDf7OW/hkmYPJrgPRdNmwand/DDT90lnoNFj/sBg6MsnjkP6LMad69S1urLnjfZnhbd8L3d89SPo8LOpNn6OmN4KaFh+IMbm+c871U4bgjeMjz3ZR+iyIcLhZqGAnrdzvqtTS8+U3VhGMOwqSYg2LWcXEb+7rKl9NTtjYGMFmgf6J7VdRbppxRm1siIi6MiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiKiCqIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICoqogoqoiCiKqICIiAiIgIiICIiAiIgIiICIiAiIg/9k=",
  },
];

const CategoryHighlights = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-white py-6 px-4">
      {isMobile ? (
        <Carousel
          showThumbs={false}
          infiniteLoop
          showStatus={false}
          autoPlay
          interval={2500}
          stopOnHover
          swipeable
          showArrows={false}
          centerMode
          centerSlidePercentage={100}
        >
          {categoryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-4 rounded shadow hover:shadow-lg transition bg-white mx-2 h-36"
            >
              <div className="text-left space-y-1 flex-1">
                <p className="text-xs text-gray-500 font-medium">
                  BIG RANGE OF
                </p>
                <h3 className="text-base font-semibold text-black">
                  {item.title}
                </h3>
                <p className="text-blue-600 text-sm font-medium">
                  {item.offer}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {categoryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border p-4 rounded shadow hover:shadow-lg transition bg-white h-36"
            >
              <div className="text-left space-y-1 flex-1">
                <p className="text-xs text-gray-500 font-medium">
                  BIG RANGE OF
                </p>
                <h3 className="text-base font-semibold text-black">
                  {item.title}
                </h3>
                <p className="text-blue-600 text-sm font-medium">
                  {item.offer}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryHighlights;
