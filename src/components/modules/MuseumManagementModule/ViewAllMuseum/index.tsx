"use client";

import {
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableProps,
  Typography,
  message,
} from "antd";
import { useParams } from "next/navigation";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
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

interface DataType {
  _id: string;
  sceneView: string;
  name: string;
  objects: string[];
  description: string;
  address: string;
  bannerUrl: string;
}

function MuseumManagementModule() {
  const params = useParams();
  const router = useRouter();

  const [addForm] = Form.useForm();

  const addModal = useModal();
  const editModal = useModal();

  const [deleteDepartment] = useDeleteDepartmentMutation();
  const { result, isFetching, refetch } = useGetAllDepartmentsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => {
      return {
        result: data?.data ?? [],
        isFetching,
      };
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteDepartment(id).unwrap();
      message.success("Xóa thành công");
      refetch();
    } catch (error) {}
  };

  const handleAddMuseum = async (values: any) => {
    try {
      addModal.closeModal();
      message.success("Tạo thành công");
    } catch (error) {
      message.error("Tạo thất bại");
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      width: 50,
      render: (_, record, index) => <Typography>{index + 1}</Typography>,
    },
    {
      title: "Ảnh bìa",
      dataIndex: "bannerUrl",
      key: "bannerUrl",
      width: 200,
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
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Đia điểm",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      render: (_, record) => {
        return (
          <Flex justify="center" gap={20}>
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                router.push(`/museum-management/${record?._id}`);
              }}
            />
            <Popconfirm
              title={"Bạn có chắc chắn muốn xóa?"}
              description={"Hành động này không thể hoàn tác"}
              okText={"Xóa"}
              cancelText={"Huỷ"}
              onConfirm={() => handleDelete(record?._id)}
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
      <S.Head>
        <Typography.Title level={2}>Danh sách các bảo tàng</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addModal.openModal}
        >
          Thêm bảo tàng
        </Button>
      </S.Head>

      <S.TableWrapper>
        <Table columns={columns} dataSource={museums} loading={isFetching} />
      </S.TableWrapper>
      <Modal
        open={addModal.visible}
        title={"Tạo bảo tàng mới"}
        footer={[]}
        onCancel={addModal.closeModal}
      >
        <Form layout="vertical" form={addForm} onFinish={handleAddMuseum}>
          <Form.Item
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
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Mô tả không được để trống",
              },
            ]}
            label="Địa chỉ"
          >
            <Input placeholder="Địa chỉ bảo tàng" />
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

export default MuseumManagementModule;
