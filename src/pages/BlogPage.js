import { Input } from "components/input";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, doc, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import _, { debounce } from "lodash";
import PostItem from "module/post/PostItem";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BlogPageStyles = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px;
  overflow: hidden;
`;
const POST_PER_PAGE = 10;
const BlogPage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState("");
  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "posts");
      const docData = await getDocs(colRef);
      const categoryList = docData.docs.map((doc) => doc.data().category.name);
      setCategory(_.uniq(categoryList));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const colRef = collection(db, "posts");
        const newRef = value ? query(colRef, where("category.name", "==", value)) : query(colRef);
        onSnapshot(newRef, (snapshot) => {
          const postList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setPostList(postList);
        });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [value]);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + POST_PER_PAGE;
  const currentItems = postList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(postList.length / POST_PER_PAGE);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * POST_PER_PAGE) % postList.length;

    setItemOffset(newOffset);
  };
  return (
    <BlogPageStyles>
      <Layout>
        <div className='flex items-center justify-between mt-10'>
          <h1 className='text-2xl '>Danh sách các bài viết:</h1>
        </div>
        <div className='flex items-center gap-10 mt-10 '>
          <h1 className='text-2xl font-mb '>Lọc bài viết:</h1>
          <select
            id='category'
            className='w-[200px] p-3 rounded-lg border cursor-pointer text-sm'
            onChange={(e) => {
              setValue(e.target.value);
            }}
          >
            <option value=''>Select category...&hellip;</option>
            {category?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className='!grid-cols-3 form-layout !mt-10  '>
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((post) => {
              return <PostItem key={post.id} post={post}></PostItem>;
            })}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel=' >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='< '
          renderOnZeroPageCount={null}
          className='pagination'
        />
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
