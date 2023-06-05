import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews=async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=673b80a040cd4d44a982a148160231b9&page=${page}&
    pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(75);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey App`;

  updateNews();
}, [])

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=673b80a040cd4d44a982a148160231b9&page=${page+1}&
    pagesize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles( articles.concat (parsedData.articles))
    setTotalResults(parsedData.setTotalResults)
 };
  

 
    return (
      <>
      <h2 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>Monkey news -Top  {capitalizeFirstLetter(props.category)} Headlines </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults }
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
       
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  catagory: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News