<template>
  <frontVue>
    <div class="cover">
      <img :src="imgSrc" :alt="postData.title" loading="lazy" />
      <div class="info">
        <div class="info-head">
          <div>
            <n-icon-wrapper :size="18" :border-radius="15">
              <n-icon :size="13" :component="Calendar" />
            </n-icon-wrapper>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-time
                  time-zone="Asia/Shanghai"
                  :time="new Date(postData.created_at)"
                  type="relative"
                />
              </template>
              <n-time
                time-zone="Asia/Shanghai"
                :time="new Date(postData.created_at)"
                format="yyyy-MM-dd HH:mm:ss"
              />
            </n-tooltip>
          </div>
          <div class="rightInfo">
            <div style="margin-right: 0.5rem">
              <n-icon-wrapper
                :size="18"
                :border-radius="15"
                color="rgb(192,202,51)"
              >
                <n-icon :size="13" :component="Book" />
              </n-icon-wrapper>
              1.5K阅读
            </div>
            <div>
              <n-icon-wrapper
                color="rgb(67,160,71)"
                :size="18"
                :border-radius="15"
              >
                <n-icon :size="13" :component="PricetagsSharp" />
              </n-icon-wrapper>
              {{ category.name }}
            </div>
          </div>
        </div>

        <div class="info-text">
          <h1>{{ postData.title }}</h1>
          <span>{{ postData.desc }}</span>
        </div>
        <div class="info-tags">
          <n-space :wrap="false">
            <n-tag
              v-for="tag in postData.tags"
              size="small"
              round
              :color="tag.color"
              :type="
                tag.color
                  ? ''
                  : ['primary', 'info', 'success', 'warning', 'error'][
                      Math.floor(Math.random() * 5)
                    ]
              "
            >
              {{ tag.name }}
            </n-tag>
          </n-space>
        </div>
      </div>
    </div>
    <n-divider />
    <div class="content" v-html="postData.content"></div>
    <n-divider />
    <div class="copyright">
      <strong>本文链接：</strong>
      <a :href="url" :title="url" target="_blank" rel="noopener">
        {{ url }}
      </a>
      <br />
      <strong>版权声明：</strong>
      本文采用
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/3.0/cn/deed.zh"
        target="_blank"
        rel="external nofollow noopener noreferrer"
      >
        CC BY-NC-SA 3.0 CN
      </a>
      协议进行许可
    </div>
    <n-divider />
    <div class="comment-view" style="padding: 0px">
      <u-comment
        :config="config"
        @submit="submit"
        @like="like"
        @remove="remove"
        @report="report"
      >
        <template #list-title>全部评论</template>
      </u-comment>
    </div>
  </frontVue>
</template>

<script setup>
import frontVue from "@/layout/front.vue";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import { 随机风景API } from "@/settings/config.js";
import { globalData } from "@/store/modules/globalData.js";
import { Calendar, Book, PricetagsSharp } from "@vicons/ionicons5";
import { computed } from "@vue/reactivity";
import { UToast } from "undraw-ui";
import emoji from "@/utils/emoji";

const url = ref(window.location.href);
const dataStore = globalData();
const route = useRoute();
const message = useMessage();
const postData = ref({
  id: -1,
  created_at: "2000-01-01T00:00:00+08:00",
  updated_at: "2022-01-01T00:00:00+08:00",
  deleted_at: null,
  title: "",
  img: "",
  desc: "",
  content: "",
  cid: -1,
  tags: [],
});

const imgSrc = computed(() => {
  return postData.value.img ? postData.value.img : 随机风景API;
});
const categorys = computed(() => dataStore.getCategory);

const category = computed(() => {
  return categorys.value.find((item) => {
    return item.id == postData.value.cid;
  });
});

const config = reactive({
  user: {
    id: 1,
    username: "user",
    avatar:
      "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100",
    // 评论id数组 建议:存储方式用户id和文章id和评论id组成关系,根据用户id和文章id来获取对应点赞评论id,然后加入到数组中返回
    likes: [1, 2, 11],
  },
  emoji: emoji,
  comments: [],
});

let temp_id = 100;
// 提交评论事件
const submit = (content, parentId, finish) => {
  console.log(content, parentId);
  let comment = {
    id: (temp_id += 1),
    parentId: parentId,
    uid: config.user.id,
    username: config.user.username,
    avatar: config.user.avatar,
    level: 6,
    link: `/${(temp_id += 1)}`,
    address: "来自江苏",
    content: content,
    like: 0,
    createTime: "1分钟前",
    reply: null,
  };
  setTimeout(() => {
    finish(comment);
    UToast({ message: "评论成功!", type: "info" });
  }, 200);
};

// 删除评论
const remove = (id, finish) => {
  setTimeout(() => {
    finish();
    alert(`删除成功: ${id}`);
  }, 200);
};

//举报用户
const report = (id, finish) => {
  console.log(id);
  setTimeout(() => {
    finish();
    alert(`举报成功: ${id}`);
  }, 200);
};

// 点赞按钮事件
const like = (id, finish) => {
  console.log(id);
  setTimeout(() => {
    finish();
  }, 200);
};

config.comments = [
  {
    id: 1,
    parentId: null,
    uid: 1,
    username: "落🤍尘",
    avatar:
      "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100",
    level: 6,
    link: "/1",
    address: "来自上海",
    content:
      "缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]",
    like: 2,
    createTime: "1分钟前",
    reply: null,
  },
  {
    id: 2,
    parentId: null,
    uid: 2,
    username: "悟二空",
    avatar:
      "https://static.juzicon.com/user/avatar-bf22291e-ea5c-4280-850d-88bc288fcf5d-220408002256-ZBQQ.jpeg",
    level: 1,
    link: "/2",
    address: "来自苏州",
    content:
      "知道在学校为什么感觉这么困吗？因为学校，是梦开始的地方。[脱单doge]",
    like: 11,
    createTime: "1天前",
    reply: {
      total: 2,
      list: [
        {
          id: 21,
          parentId: 2,
          uid: 3,
          username: "别扰我清梦*ぁ",
          avatar:
            "https://static.juzicon.com/user/avatar-8b6206c1-b28f-4636-8952-d8d9edec975d-191001105631-MDTM.jpg?x-oss-process=image/resize,m_fill,w_100,h_100",
          level: 5,
          link: "/21",
          address: "来自重庆",
          content: "说的对，所以，综上所述，上课睡觉不怪我呀💤",
          like: 3,
          createTime: "1分钟前",
        },
        {
          id: 22,
          parentId: 2,
          uid: 4,
          username: "Blizzard",
          avatar:
            "https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100",
          level: 3,
          link: "/22",
          content:
            '回复 <span style="color: blue;"">@别扰我清梦*ぁ:</span> 看完打了一个哈切。。。会传染。。。[委屈]',
          address: "来自广州",
          like: 9,
          createTime: "1天前",
        },
      ],
    },
  },
];

onMounted(() => {
  axios.get(`/api/v1/article/${route.params.pid}`).then((res) => {
    if (res.data.status == 200) {
      postData.value = res.data.data;
    } else {
      message.error(res.data.message);
    }
  });
});
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  min-height: 230px;
  background-color: #eee;
  img {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(50%);
  }
  .info {
    position: absolute;
    color: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-transform: none;
    margin: 0;
    padding: 24px;
    z-index: 1;
    text-shadow: 0 1px 3px rgb(0 0 0 / 25%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.3rem;
  > div {
    display: flex;
    align-items: center;
  }
}

.content {
  margin-top: 20px;
  padding: 10px;
}

.copyright {
  a {
    text-decoration: none;
    color: rgb(255, 47, 47);
  }
}
</style>
