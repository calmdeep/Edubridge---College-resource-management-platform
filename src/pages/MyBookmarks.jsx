import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../components/layout/DashboardLayout";

import {
  getBookmarks,
  getResourceById,
  removeBookmark,
}
from "../services/resourceService";

import {
  useAuth,
} from "../context/AuthContext";

export default function MyBookmarks() {

  const { user } = useAuth();

  const [resources,setResources] =
    useState([]);

  useEffect(()=>{
    loadBookmarks();
  },[]);

  const loadBookmarks =
    async()=>{

      const bookmarks =
        await getBookmarks(
          user.uid
        );

      const data =
        await Promise.all(

          bookmarks.map(
            async(bookmark)=>{

              const resource =
                await getResourceById(
                  bookmark.resourceId
                );

              return {
                bookmarkId:
                  bookmark.id,

                ...resource,
              };
            }
          )

        );

      setResources(data);
    };

  const handleRemove =
    async(id)=>{

      await removeBookmark(id);

      loadBookmarks();
    };

  return(

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">

        My Bookmarks

      </h1>

      <div className="grid gap-4">

        {resources.map(
          (resource)=>(

          <div
            key={resource.id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h2 className="font-bold text-xl">

              {resource.title}

            </h2>

            <p className="text-gray-500">

              {resource.subject}

            </p>

            <div className="mt-4 flex gap-2">

              <a
                href={resource.resourceUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Open
              </a>

              <button
                onClick={()=>
                  handleRemove(
                    resource.bookmarkId
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );
}