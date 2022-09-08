import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { storage } from "../../firebase/firebase.config";
import { resetSchoolAuth } from "../../features/school/schoolAuthSlice";
import {
  fetchSchoolData,
  resetSchoolData,
} from "../../features/school/schoolDataSlice";
import {
  closeEditProfileModal,
  openEditProfileModal,
  setCurrentPage,
  showForm,
} from "../../features/config/configData";

import HtmlEditor, {
  Toolbar,
  MediaResizing,
  ImageUpload,
  Item,
} from "devextreme-react/html-editor";

import {
  Content,
  ErrorContainer,
  LoadingContainer,
  Wrapper,
} from "./Editor.styles";
import { BiError } from "react-icons/bi";

import PageHeader from "../../components/PageHeader/Index";
import Spinner from "../../components/Spinner/Index";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRef } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import EditModal from "../../components/EditModal/Index";
import { useCallback } from "react";

const LightTheme = React.lazy(() =>
  import("../../DEThemes/SchedulerThemes/LightTheme")
);
const DarkTheme = React.lazy(() =>
  import("../../DEThemes/SchedulerThemes/DarkTheme")
);

const EditorTheme = ({ children }) => {
  const CHOSEN_THEME =
    useSelector((state) => state.schoolData.data.settings.theme) ?? "Light";
  return (
    <>
      <React.Suspense fallback={<></>}>
        {CHOSEN_THEME.trim() === "Light" && <LightTheme />}
        {CHOSEN_THEME.trim() === "Dark" && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  );
};

const Editor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Editor Settings Start Here
  const markup = useRef(`
  <div>
      <h2>
          <img src="https://js.devexpress.com/Demos/WidgetsGallery/Content/Images/Widgets/HtmlEditor.svg" alt="HtmlEditor"/>
          SchoolZone Rich Text Editor (HTML Editor)
      </h2>
      <br>
      <p>DevExtreme JavaScript HTML Editor is a client-side WYSIWYG text editor that allows its users to format textual and visual content and store it as HTML or Markdown.</p>
      <p>Supported features:</p>
      <ul>
          <li>Inline formats:
              <ul>
                  <li><strong>Bold</strong>, <em>italic</em>, <s>strikethrough</s> text formatting</li>
                  <li>Typeface, font size, text color changes (HTML only)</li>
              </ul>
          </li>
          <li>Block formats:
              <ul>
                  <li>Headers</li>
                  <li>Lists (ordered and unordered)</li>
                  <li>Code blocks</li>
                  <li>Quotes</li>
              </ul>
          </li>
          <li>Built-in format customization</li>
          <li>HTML and Markdown support</li>
          <li>Mail Merge</li>
          <li>Adaptive toolbar for working with images, links, and color formats</li>
          <li>Copy-paste rich content (the control strips unsupported formats)</li>
          <li>Embedded images specified as a link to an image file or as base64-encoded binary data</li>
          <li>Mention (for example, @person)</li>
          <li>Tables</li>
      </ul>
      <br>
      <p>The editor supports the following frameworks and libraries:</p>
      <table>
          <tr>
              <td><strong>jQuery</strong></td>
              <td>v2.1 - v2.2 and v3.x</td>
          </tr>
          <tr>
              <td><strong>Angular</strong></td>
              <td>v7.0.x - v11.0.x</td>
          </tr>
          <tr>
              <td><strong>React</strong></td>
              <td>v16.2+</td>
          </tr>
          <tr>
              <td><strong>Vue</strong></td>
              <td>v2.6.3+</td>
          </tr>
      </table>
  </div>
`);
  const [uploadInfo, setUploadInfo] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    isValid: markup.current.trim().length < 1 ? false : true,
  });

  const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
  const fontValues = [
    "Arial",
    "Courier New",
    "Georgia",
    "Impact",
    "Lucida Console",
    "Tahoma",
    "Times New Roman",
    "Verdana",
  ];
  const headerValues = [false, 1, 2, 3, 4, 5];
  const dialogTabs = ["url", "file"];
  // Editor Settings End Here
  const [publishingError, setPublishingError] = useState(false);
  const [publishingSuccess, setPublishingSuccess] = useState(false);
  const { id: schoolId, token: schoolToken } = useSelector(
    (state) => state.schoolAuth
  );

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.schoolData
  );
  const { isEditProfileModalOpen } = useSelector((state) => state.config);

  useEffect(() => {
    if (message !== null && message.includes("jwt expired")) {
      localStorage.removeItem("schoolCredentials");
      dispatch(resetSchoolAuth());
      dispatch(resetSchoolData());
      navigate("/login");
    }
    if (message !== null && message.includes("User not authorized")) {
      localStorage.removeItem("schoolCredentials");
      dispatch(resetSchoolAuth());
      dispatch(resetSchoolData());
      navigate("/login");
    }

    dispatch(fetchSchoolData(schoolToken));
  }, [schoolToken, dispatch, navigate, message]);

  useEffect(() => {
    dispatch(setCurrentPage("editor"));
  }, [dispatch]);

  const redirect = (location) => {
    if (location === "home") {
      localStorage.removeItem("schoolCredentials");
      return navigate("/");
    } else {
      localStorage.removeItem("schoolCredentials");
      return navigate("/login");
    }
  };

  const showMe = useRef();

  return (
    <Wrapper isSuccess={isSuccess ? true : false}>
      {publishingSuccess && (
        <div className="publish-success-message">
          <AiOutlineFileDone style={{ fontSize: "1.4rem" }} />
          <p>{uploadInfo.message}</p>
        </div>
      )}
      {publishingError && (
        <div className="publish-error-message">
          <BiError style={{ fontSize: "1.4rem", paddingTop: "-5px" }} />
          <p>{uploadInfo.message}</p>
        </div>
      )}
      {isEditProfileModalOpen && <EditModal />}
      {isLoading && (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      )}
      {isSuccess && (
        <Content>
          <main>
            <PageHeader title="Editor" />
            <EditorTheme>
              <div className="widget-container">
                <HtmlEditor
                  defaultValue={markup.current}
                  valueType="html"
                  elementAttr={{ id: "editor" }}
                  onValueChanged={(obj) => {
                    obj.component.beginUpdate();
                    markup.current = obj.value;
                    obj.value.trim().length < 1
                      ? setUploadInfo((prev) => ({ ...prev, isValid: false }))
                      : setUploadInfo((prev) => ({ ...prev, isValid: true }));
                  }}
                  ref={showMe}
                >
                  <MediaResizing enabled={true} />
                  <ImageUpload
                    maxFileSize={8000000}
                    fileUploadMode="base64"
                    tabs={dialogTabs}
                    accept="image/png, image/gif, image/jpeg"
                    allowedFileExtensions={["png", "gif", "jpg", "jpeg"]}
                    multiple={false}
                    invalidFileExtensionMessage="File type is not allowed"
                    invalidMaxFileSizeMessage="File is too large"
                    invalidMinFileSizeMessage="File is too small"
                  />
                  <Toolbar multiline={true}>
                    <Item name="undo" />
                    <Item name="redo" />
                    <Item name="separator" />
                    <Item name="size" acceptedValues={sizeValues} />
                    <Item
                      name="font"
                      acceptedValues={fontValues}
                      defaultValue="Tahoma"
                    />
                    <Item name="separator" />
                    <Item name="bold" />
                    <Item name="italic" />
                    <Item name="strike" />
                    <Item name="underline" />
                    <Item name="separator" />
                    <Item name="alignLeft" />
                    <Item name="alignCenter" />
                    <Item name="alignRight" />
                    <Item name="alignJustify" />
                    <Item name="separator" />
                    <Item name="orderedList" />
                    <Item name="bulletList" />
                    <Item name="separator" />
                    <Item name="header" acceptedValues={headerValues} />
                    <Item name="separator" />
                    <Item name="color" />
                    <Item name="background" />
                    <Item name="separator" />
                    <Item name="link" />
                    <Item name="image" />
                    <Item name="separator" />
                    <Item name="clear" />
                    <Item name="codeBlock" />
                    <Item name="blockquote" />
                    <Item name="separator" />
                    <Item name="insertTable" />
                    <Item name="deleteTable" />
                    <Item name="insertRowAbove" />
                    <Item name="insertRowBelow" />
                    <Item name="deleteRow" />
                    <Item name="insertColumnLeft" />
                    <Item name="insertColumnRight" />
                    <Item name="deleteColumn" />
                    <Item name="cellProperties" />
                    <Item name="tableProperties" />
                  </Toolbar>
                </HtmlEditor>
              </div>
              <div className="button-holder">
                {!uploadInfo.isLoading && uploadInfo.isValid && (
                  <button
                    className="primary-btn publish-btn"
                    onClick={async () => {
                      dispatch(openEditProfileModal());
                      dispatch(showForm("publishing"));

                      setUploadInfo((prev) => ({
                        isLoading: true,
                        isError: false,
                        isSuccess: false,
                        message: null,
                        isValid:
                          markup.current.trim().length < 1 ? false : true,
                      }));
                      const articleId = uuidv4();
                      try {
                        const storageRef = ref(
                          storage,
                          `/articles/${articleId}`
                        );

                        const uploadStringRef = await uploadString(
                          storageRef,
                          markup
                        );
                        const downloadUrl = await getDownloadURL(
                          uploadStringRef.ref
                        );
                        const res = await axios({
                          url: `/api/schools/${schoolId}/articles/${articleId}}`,
                          method: "POST",
                          data: { articleURL: downloadUrl },
                          headers: {
                            Authorization: `Bearer ${schoolToken}`,
                          },
                        });

                        markup.current = "";
                        setPublishingSuccess(true);
                        dispatch(fetchSchoolData(schoolToken));

                        setUploadInfo((prev) => ({
                          isLoading: false,
                          isError: false,
                          isSuccess: true,
                          message: "Article successfully published",
                          isValid:
                            markup.current.trim().length < 1 ? false : true,
                        }));
                        setTimeout(
                          () => dispatch(closeEditProfileModal()),
                          3000
                        );
                        setTimeout(() => setPublishingSuccess(false), 10000);
                      } catch (error) {
                        setUploadInfo((prev) => ({
                          ...prev,
                          isLoading: false,
                          isError: true,
                          isSuccess: false,
                          message:
                            "Couldn't upload article at the moment, please try again later.",
                          isValid:
                            markup.current.trim().length < 1 ? false : true,
                        }));

                        setPublishingError(true);
                        setTimeout(
                          () => dispatch(closeEditProfileModal()),
                          3000
                        );
                        setTimeout(() => setPublishingError(false), 10000);
                      }
                    }}
                    type="button"
                  >
                    Publish
                  </button>
                )}
                {uploadInfo.isLoading && <Spinner />}
              </div>
            </EditorTheme>
          </main>
        </Content>
      )}
      {isError && (
        <ErrorContainer>
          <BiError
            style={{
              color: "red",
              fontSize: "5rem",
            }}
          />
          <p>
            {message.includes("jwt expired")
              ? "Timeout"
              : `${message}, try refreshing the page.`}
          </p>
          <div className="button-group">
            <button onClick={() => redirect("home")}>Go to homepage</button>
            <button onClick={() => redirect("login")}>Go to Sign in</button>
          </div>
        </ErrorContainer>
      )}
    </Wrapper>
  );
};

export default Editor;
