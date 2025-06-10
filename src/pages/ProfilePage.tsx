import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAllRecipes } from "../features/recipeSlice";
import { toggleFollowUser } from "../features/followSlice";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { BookOpen, LogOut, User } from "lucide-react";
import RecipeGrid from "../components/recipe/RecipeGrid";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id: routeUserId } = useParams();
  const loggedInUserId = localStorage.getItem("userId") || "";
  const profileUserId = routeUserId || loggedInUserId;
  const viewingOwnProfile = profileUserId === loggedInUserId;

  const { users, user: loggedInUser } = useSelector(
    (state: RootState) => state.auth
  );
  const followState = useSelector((state: RootState) => state.follow);
  const { recipes } = useSelector((state: RootState) => state.recipes);

  const [profileUser, setProfileUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("my-recipes");

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (viewingOwnProfile) {
      setProfileUser(loggedInUser);
    } else {
      const userFromStore = users.find((u) => u._id === profileUserId);
      if (userFromStore) {
        setProfileUser(userFromStore);
      } else {
        dispatch(profileUserId!).then((res: any) => {
          if (res.payload) {
            setProfileUser(res.payload);
          }
        });
      }
    }
  }, [
    dispatch,
    routeUserId,
    users,
    loggedInUser,
    profileUserId,
    viewingOwnProfile,
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const isFollowing = followState.followingIds.includes(profileUserId!);
  const handleToggleFollow = () => {
    dispatch(toggleFollowUser({ targetUserId: profileUserId!, isFollowing }));
  };

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.userId === profileUserId
  );

  if (!profileUser) return <p>Loading...</p>;

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary-600 p-6 text-white">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-center">
                  {profileUser.name}
                </h2>
                <p className="text-center text-primary-100">
                  {profileUser.email}
                </p>
              </div>

              <div className="p-4">
                <button
                  onClick={
                    viewingOwnProfile
                      ? () => navigate("/profile?isedit=true")
                      : handleToggleFollow
                  }
                  className="btn-outline w-full mb-4"
                >
                  {viewingOwnProfile
                    ? "Edit Profile"
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </button>

                <div className="p-4">
                  <div className="flex justify-between border-b pb-3 mb-3">
                    <div className="text-center">
                      <p className="font-bold text-lg">
                        {filteredRecipes.length}
                      </p>
                      <p className="text-sm text-gray-500">Recipes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">156</p>
                      <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">89</p>
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Food enthusiast and home cook. I love trying new recipes and
                    sharing my kitchen adventures!
                  </p>

                  {viewingOwnProfile && (
                    <nav className="space-y-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Log Out</span>
                      </button>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Recipes Tab */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="my-recipes" className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Recipes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-recipes">
                  {filteredRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No recipes yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {viewingOwnProfile
                          ? "You haven't created any recipes yet"
                          : `${profileUser.name} hasn't created any recipes yet`}
                      </p>
                    </div>
                  ) : (
                    <RecipeGrid recipes={filteredRecipes} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
