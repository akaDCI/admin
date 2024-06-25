import { Image } from "antd";
import styled from "styled-components";

export const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding-bottom: 16px;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const TableWrapper = styled.div`
  width: 100%;

  margin-bottom: 24px;
`;

export const FilterWrapper = styled.div`
  width: 30%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 24px;
`;

export const UploadWrap = styled.div`
  .ant-upload-wrapper {
    .ant-upload-drag {
      margin-bottom: 8px;
      background: transparent;

      .ant-upload {
        padding: 8px;
      }
    }

    .ant-upload-drag:not(.ant-upload-disabled):hover {
      border-color: ${({ theme }) => theme?.colors?.primary};
    }

    .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item {
      padding: 0px;
      border-radius: 0px;

      &::before {
        width: 100% !important;
        height: 100% !important;

        background-color: rgba(0, 0, 0, 0.1) !important;
      }
    }
  }
`;

export const ImageWrapper = styled(Image)`
  max-width: 100% !important;
  width: 100% !important;
  height: 400px;

  object-fit: contain;
`;

export const ImageArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;

    border: none;
    background: #00000050;

    width: 32px;
    height: 32px;

    border-radius: 50%;

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
      background: #00000080;
    }
  }
`;
