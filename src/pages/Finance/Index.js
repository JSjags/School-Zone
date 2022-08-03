import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { resetSchoolAuth } from "../../features/school/schoolAuthSlice";
import {
  fetchSchoolData,
  resetSchoolData,
} from "../../features/school/schoolDataSlice";
import { setCurrentPage } from "../../features/config/configData";

import { FaSignOutAlt, FaIdCardAlt } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import {
  MdMessage,
  MdNotifications,
  MdSettings,
  MdSpaceDashboard,
  MdPeopleAlt,
  MdLocationPin,
} from "react-icons/md";

import { Wrapper, Content } from "./Finance.styles";
import noFinanceSvg from "../../assets/no-financial-data.svg";

const Finance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("schoolCredentials");
    dispatch(resetSchoolAuth());
    dispatch(resetSchoolData());
    navigate("/login");
  };

  const { financialData } = useSelector((state) => state.schoolData.data);

  useEffect(() => {
    dispatch(setCurrentPage("finance"));
  }, [dispatch]);

  return (
    <Wrapper>
      <Content>
        <main>
          <header>
            <h1>Finance</h1>
            <ul>
              <li>
                <MdMessage style={{ fontSize: "1.4rem" }} />
                <span>Messages</span>
              </li>
              <li>
                <MdNotifications style={{ fontSize: "1.4rem" }} />
                <span>Notifications</span>
              </li>
              <li>
                <MdSettings style={{ fontSize: "1.4rem" }} />
                <span>Settings</span>
              </li>
            </ul>
            <button id="sign-out" onClick={handleLogout}>
              <FaSignOutAlt style={{ fontSize: "1.4rem" }} />
              <span>Sign out</span>
            </button>
          </header>
          {financialData === undefined && (
            <div className="create-finance">
              <img alt="add-student" src={noFinanceSvg}></img>
              <p>No financial data found.</p>
              <div className="create-finance-button-group">
                <button>
                  <BsPersonPlus style={{ fontSize: "2rem" }} />
                  <span>Register Staff</span>
                </button>
                <button>
                  <IoCreateOutline style={{ fontSize: "2rem" }} />
                  <span>Create Register Template</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </Content>
    </Wrapper>
  );
};

export default Finance;
