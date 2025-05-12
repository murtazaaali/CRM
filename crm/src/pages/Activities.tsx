import { useEffect } from "react";
import useActivityStore from "../store/activities";
import { TrashIcon } from "@heroicons/react/24/outline"; // Import trash icon from heroicons
import { Link } from "react-router-dom";

interface Dashboard {
  isDashboard: boolean;
}

const Activities = ({ isDashboard }: Dashboard) => {
  const { activities, removeActivity, fetchActivities } = useActivityStore();

  const handleRemove = async (id: string) => {
    removeActivity(id);
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (isDashboard) {
    return activities.map((activity) => (
      <Link to={activity?.link} key={activity._id} className="flex items-start space-x-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{activity?.title}</p>
          <p className="text-sm text-gray-500">{activity.detail}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(activity.createdAt).toLocaleDateString()} |{" "}
            {activity.type}
          </p>
        </div>
      </Link>
    ));
  }

  return (
    <div className="max-w-3xl mx-auto px-2 py-4">
      {activities.length === 0 ? (
        <div className="text-center text-gray-500 text-sm">
          No activities found.
        </div>
      ) : (
        <div className="space-y-2">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start justify-between p-2 bg-white shadow-sm rounded-md hover:shadow-md transition-all"
            >
              <Link to={activity?.link} className="flex flex-col space-y-0.5">
                <h3 className="text-sm font-medium text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {activity.detail}
                </p>
                <div className="flex items-center space-x-1 text-[10px] text-gray-500">
                  <span>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                  <span>|</span>
                  <span>{activity.type}</span>
                </div>
              </Link>
              <button
                onClick={() => handleRemove(activity._id)}
                className="p-1 text-red-500 hover:text-red-700 transition"
                title="Remove"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
