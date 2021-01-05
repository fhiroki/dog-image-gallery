import { useEffect, useState } from "react";
import { fetchBreeds, fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Dog Images</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }

  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    fetchBreeds().then((breeds) => {
      setBreeds(breeds);
    })
  }, []);

  function handleChange(event) {
    event.preventDefault();
    props.onFormSubmit(event.target.value);
  }

  return (
    <div>
      <p className="label">Select Dog</p>
      <form onChange={handleChange}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="affenpinscher">
                {breeds.map((breed) => {
                  return (
                    <option value={breed}>{breed}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

function Main() {
  const [urls, setUrls] = useState(null);

  useEffect(() => {
    fetchImages("affenpinscher").then((urls) => {
      setUrls(urls);
    })
  }, []);

  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://doc.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
