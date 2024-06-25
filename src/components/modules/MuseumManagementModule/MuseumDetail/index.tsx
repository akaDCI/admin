"use client";

import {
  Breadcrumb,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  TableProps,
  Typography,
  Upload,
  message,
} from "antd";
import { useParams } from "next/navigation";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useRouter } from "next-nprogress-bar";

import {
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
} from "@/store/queries/departmentMangement";
import useModal from "@/hooks/useModal";
import { museums } from "@/helpers/data/museum";

import Button from "@/components/core/common/Button";

import * as S from "./styles";
import CustomCKEditor from "@/components/core/common/CustomCKEditor";
import themeColors from "@/style/themes/default/colors";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { objects } from "@/helpers/data/objects";
import Link from "next/link";

interface FieldType {
  _id: string;
  objectView: string;
  name: string;
  description: string;
  bannerUrl: string;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  direction: number[];
  scale: number;
  images: string[];
  video: string;
}

function MuseumDetail() {
  const data = museums[0];

  const [myForm] = useForm();

  const router = useRouter();
  const params = useParams();

  const addModal = useModal();

  const [imageUrl, setImageUrl] = useState<string>("");

  const handleChangeEditor = (value: string) => {
    myForm.setFieldsValue({ description: value });
  };

  useEffect(() => {
    if (data) {
      setImageUrl(data?.bannerUrl);
      console.log({
        ...data,
      });

      myForm.setFieldsValue({
        ...data,
      });
    }
  }, [data, myForm]);

  const handleAddObject = async (values: any) => {
    try {
      addModal.closeModal();
      message.success("Tạo thành công");
    } catch (error) {
      message.error("Tạo thất bại");
    }
  };

  const columns: TableProps<FieldType>["columns"] = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 60,
      render: (_, record, index) => <Typography>{index + 1}</Typography>,
      fixed: "left",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "bannerUrl",
      key: "bannerUrl",
      width: 200,
      fixed: "left",
      render: (_, record, index) => (
        <Image
          alt=""
          src={record?.bannerUrl}
          width={120}
          height={90}
          style={{
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => {
        return (
          <Flex justify="center" gap={8}>
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                router.push(
                  `/museum-management/${params?.museumId}/${record?._id}`
                );
              }}
            />
            <Popconfirm
              title={"Bạn có chắc chắn muốn xóa?"}
              description={"Hành động này không thể hoàn tác"}
              okText={"Xóa"}
              cancelText={"Huỷ"}
              // onConfirm={() => handleDelete(record?._id)}
            >
              <Button
                type="primary"
                shape="circle"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <S.PageWrapper>
      <Breadcrumb
        style={{
          marginBottom: 32,
        }}
        itemRender={(route, params, routes, paths) => {
          const last = routes.indexOf(route) === routes?.length - 1;
          return !last ? (
            <Link href={`${route.href}`}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        items={[
          {
            href: "/museum-management",
            title: "Danh sách bảo tàng",
            breadcrumbName: "Danh sách bảo tàng",
          },

          {
            title: "Bảo tàng Đà Nẵng",
            breadcrumbName: "Bảo tàng Đà Nẵng",
          },
        ]}
      />
      {/* <Flex
        gap={16}
        style={{
          marginBottom: 32,
        }}
      >
        <ArrowLeftOutlined onClick={() => router.push("/museum-management")} />
        <Typography.Title level={2}>Bảo tàng Đà Nẵng</Typography.Title>
      </Flex> */}
      <Form layout="vertical" form={myForm}>
        <Typography.Title
          level={4}
          style={{
            marginBottom: 16,
          }}
        >
          Thông tin bảo tàng
        </Typography.Title>
        <Form.Item<FieldType>
          name="name"
          rules={[
            {
              required: true,
              message: "Tên bảo tàng không được để trống",
            },
          ]}
          label="Tên bảo tàng"
        >
          <Input placeholder="Tên bảo tàng" />
        </Form.Item>
        <Form.Item<FieldType>
          rules={[{ required: true, message: "Mô tả không được để trống" }]}
          label="Mô tả"
          name="description"
          wrapperCol={{ span: 24 }}
        >
          <CustomCKEditor
            data={data?.description}
            getData={handleChangeEditor}
          />
        </Form.Item>
        <Form.Item
          label="Ảnh bìa"
          rules={[
            {
              required: true,
              message: "Ảnh bìa không được để trống",
              validator: () => {
                return imageUrl
                  ? Promise.resolve()
                  : Promise.reject("Vui lòng tải lên ảnh bìa");
              },
            },
          ]}
          name="bannerUrl"
        >
          {!imageUrl && (
            <S.UploadWrap>
              <Upload.Dragger
                name="file"
                action="https://api.imgbb.com/1/upload?expiration=600&key=d0adfbcb1f973887c165948d50681492"
                headers={{
                  authorization: "authorization-text",
                }}
                // customRequest={handleUpload}
                multiple={false}
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload.Dragger>
            </S.UploadWrap>
          )}

          {imageUrl && (
            <S.ImageArea>
              <button>
                <CloseOutlined
                  style={{ fontSize: 16, color: themeColors.textWhite }}
                  onClick={() => setImageUrl("")}
                />
              </button>
              <S.ImageWrapper src={imageUrl} alt="" width={600} height={400} />
            </S.ImageArea>
          )}
        </Form.Item>
        <Form.Item
          label="Model 3D (.glb/.gltf)"
          rules={[
            {
              required: true,
              message: "Model 3D không được để trống",
              validator: () => {
                return imageUrl
                  ? Promise.resolve()
                  : Promise.reject("Vui lòng tải lên Model 3D");
              },
            },
          ]}
          name="bannerUrl"
        >
          <S.UploadWrap>
            <Upload.Dragger
              name="file"
              action="https://api.imgbb.com/1/upload?expiration=600&key=d0adfbcb1f973887c165948d50681492"
              headers={{
                authorization: "authorization-text",
              }}
              // customRequest={handleUpload}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Tải Model 3D lên</Button>
            </Upload.Dragger>
          </S.UploadWrap>
        </Form.Item>
        <Typography.Title
          level={4}
          style={{
            marginBottom: 16,
          }}
        >
          Thông số model 3D
        </Typography.Title>
        <Form.Item<FieldType>
          rules={[{ required: true, message: "Scale không được để trống" }]}
          label="Tỉ lệ Model"
          name="scale"
          wrapperCol={{ span: 8 }}
        >
          <Input placeholder="Nhập tỉ lệ model" />
        </Form.Item>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "x không được để trống" }]}
              label="Toạ độ x"
              name="x"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập x" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "y không được để trống" }]}
              label="Toạ độ y"
              name="y"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập y" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "z không được để trống" }]}
              label="Toạ độ z"
              name="z"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập z" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "x không được để trống" }]}
              label="Xoay x"
              name="rotationX"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập x" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "y không được để trống" }]}
              label="Xoay y"
              name="rotationY"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập y" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              rules={[{ required: true, message: "z không được để trống" }]}
              label="Xoay z"
              name="rotationZ"
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập z" />
            </Form.Item>
          </Col>
        </Row>
        <S.Head>
          <Typography.Title
            level={4}
            style={{
              marginBottom: 16,
            }}
          >
            Danh sách cổ vật
          </Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addModal.openModal}
          >
            Thêm cổ vật
          </Button>
        </S.Head>
        <Table dataSource={objects} columns={columns} />
      </Form>
      <Modal
        open={addModal.visible}
        title={"Tạo cổ vật mới"}
        footer={[]}
        onCancel={addModal.closeModal}
      >
        <Form layout="vertical" onFinish={handleAddObject}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Tên cổ vật không được để trống",
              },
            ]}
            label="Tên cổ vật"
          >
            <Input placeholder="Tên cổ vật" />
          </Form.Item>
          <Flex justify="center" gap={8}>
            <Button onClick={addModal.closeModal}>Huỷ</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Flex>
        </Form>
      </Modal>
    </S.PageWrapper>
  );
}

export default MuseumDetail;
