{
  "targets": [
    {
      "target_name": "mp4decrypt",
      "sources": [ "mp4decrypt.cc" ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include_dir\")",
        "bento4/include"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.7"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1,
          "AdditionalOptions": [
            "/MD"
          ]
        }
      },
      "conditions": [
        ["OS=='linux'", {
          "libraries": ["<(module_root_dir)/bento4/lib/libap4.a"]
        }],
        ["OS=='win' and target_arch=='x64'", {
          "libraries": ["<(module_root_dir)/bento4/win64/ap4.lib"]
        }],
        ["OS=='win' and target_arch=='ia32'", {
          "libraries": ["<(module_root_dir)/bento4/win32/ap4.lib"]
        }]
      ]
    }
  ]
}